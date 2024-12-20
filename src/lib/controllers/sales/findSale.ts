"use server";
import { Sale } from "@/models";
import { getWeekOfMonth, isToday, startOfYear } from "date-fns";
import {
  IFindMissingSaleServerAction,
  IFindSaleServerAction,
} from "../../api.interfaces";
import databaseConnection from "@/lib/db";
import { NextResponse } from "next/server";
import { MissingDate, SaleResponse } from "../../api.types";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

export const findSalesByYear: IFindSaleServerAction = async ({ year }) => {
  await databaseConnection();
  if (typeof year === "undefined") {
    return NextResponse.json({ error: "Year is required" }, { status: 400 });
  }
  const start = startOfYear(new Date(year, 0, 1));
  const end = new Date(year, 11, 31);
  const sales: SaleResponse[] = await Sale.find(
    {
      date: {
        $gte: start,
        $lt: end,
      },
    },
    "-__v"
  );
  if (!sales) {
    return NextResponse.json(
      { error: "No sales found for the year" },
      { status: 404 }
    );
  }
  return NextResponse.json(sales, { status: 200 });
};

export const findSalesByMonth: IFindSaleServerAction = async ({
  year,
  month,
}) => {
  await databaseConnection();
  if (typeof year === "undefined" || typeof month === "undefined") {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }
  const sales: SaleResponse[] = await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(
          `${month === 12 ? year + 1 : year}-${month === 12 ? 1 : month + 1}-01`
        ),
      },
    },
    "-__v"
  );
  if (!sales) {
    return NextResponse.json(
      { error: "No sales found for the month" },
      { status: 404 }
    );
  }
  return NextResponse.json(sales, { status: 200 });
};

export const findSalesByWeek: IFindSaleServerAction = async ({
  year,
  month,
  week,
}) => {
  await databaseConnection();
  if (typeof year === "undefined" || typeof month === "undefined") {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }
  const weekSales = await Sale.find(
    {
      date: {
        $gte: `${year}-${month}-01`,
        $lt: `${year}-${month}-31`,
      },
    },
    "-__v"
  );
  const weeksMap = new Map();
  weeksMap.set("1", []);
  weeksMap.set("2", []);
  weeksMap.set("3", []);
  weeksMap.set("4", []);
  weeksMap.set("5", []);
  weeksMap.set("6", []);

  for (let i = 0; i < weekSales.length; i++) {
    const sale = weekSales[i];
    const weekOfMonth = getWeekOfMonth(sale.date);
    weeksMap.get(weekOfMonth.toString()).push(sale);
  }

  if (typeof week === "undefined") {
    return NextResponse.json({ error: "Week is required" }, { status: 400 });
  }

  return NextResponse.json(weeksMap.get(week.toString()), { status: 200 });
};

export const findSaleByDay: IFindSaleServerAction = async ({ day }) => {
  await databaseConnection();
  if (typeof day === "undefined") {
    return NextResponse.json({ error: "Day is required" }, { status: 400 });
  }
  const sale: SaleResponse | null = await Sale.findOne(
    {
      date: {
        $gte: `${day}T00:00:00.000Z`,
        $lt: `${day}T23:59:59.999Z`,
      },
    },
    "-__v"
  );
  if (!sale) {
    return NextResponse.json(
      { error: "No sales found for the day" },
      { status: 404 }
    );
  }
  return NextResponse.json([sale], { status: 200 });
};

export const findMissSalesForYear: IFindMissingSaleServerAction = async () => {
  await databaseConnection();
  const year = new Date().getFullYear();
  let start = startOfYear(new Date(year, 0, 1));
  let end = new UTCDate();
  let dates = [];
  while (!isToday(start)) {
    dates.push(format(start, "yyyy-MM-dd"));
    start.setDate(start.getDate() + 1);
  }
  try {
    const missingSales: MissingDate[] = await Sale.aggregate([
      {
        $match: {
          date: {
            $gte: startOfYear(new UTCDate(year, 0, 1)),
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          dates: {
            $push: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date",
              },
            },
          },
        },
      },
      {
        $project: {
          dates: {
            $setDifference: [dates, "$dates"],
          },
        },
      },
    ]);
    if (!missingSales) {
      return NextResponse.json(
        { message: "No missing sales found for the year" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Missing sales found",
        data: missingSales,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching missing sales" },
      { status: 500 }
    );
  }
};
