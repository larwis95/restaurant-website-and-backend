"use server";
import { Sale } from "@/models";
import {
  isToday,
  startOfYear,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getWeekOfMonth,
} from "date-fns";
import {
  IFindMissingSaleServerAction,
  IFindSaleServerAction,
} from "../../api.interfaces";
import databaseConnection from "@/lib/db";
import { NextResponse } from "next/server";
import { MissingDate, SaleResponse } from "../../api.types";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { getPreviousWeekDates, getWeekDates } from "@/lib/helpers/dateUtils";
import { start } from "repl";

const DEC = 12;
const JAN = 0;

export const findSalesByYear: IFindSaleServerAction = async (args) => {
  await databaseConnection();
  if (!args) {
    return NextResponse.json({ error: "Year is required" }, { status: 400 });
  }
  const { year } = args;
  if (typeof year === "undefined") {
    return NextResponse.json({ error: "Year is required" }, { status: 400 });
  }
  const start = startOfYear(new UTCDate(year, JAN, 1));
  const end = new UTCDate(year, 11, 31);
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

export const findSalesByMonth: IFindSaleServerAction = async (args) => {
  await databaseConnection();
  if (!args) {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }
  const { year, month } = args;
  if (typeof year === "undefined" || typeof month === "undefined") {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }
  const start = startOfMonth(new UTCDate(year, month - 1));
  const end = endOfMonth(new UTCDate(year, month - 1));

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
      { error: "No sales found for the month" },
      { status: 404 }
    );
  }
  return NextResponse.json(sales, { status: 200 });
};

export const findSalesByCurrentWeek: IFindSaleServerAction = async () => {
  await databaseConnection();
  const currentWeek = getWeekDates(new Date()).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  try {
    const sales: SaleResponse[] = await Sale.find(
      {
        date: {
          $gte: currentWeek[0],
          $lt: currentWeek[currentWeek.length - 1],
        },
      },
      "-__v"
    );
    if (!sales) {
      return NextResponse.json(
        { error: "No sales found for the current week" },
        { status: 404 }
      );
    }
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching sales" },
      { status: 500 }
    );
  }
};

export const findSalesByPreviousWeek: IFindSaleServerAction = async () => {
  await databaseConnection();
  const previousWeek = getPreviousWeekDates().map((date) =>
    format(date, "yyyy-MM-dd")
  );
  try {
    const sales: SaleResponse[] = await Sale.find(
      {
        date: {
          $gte: previousWeek[0],
          $lt: previousWeek[previousWeek.length - 1],
        },
      },
      "-__v"
    );
    if (!sales) {
      return NextResponse.json(
        { error: "No sales found for the previous week" },
        { status: 404 }
      );
    }
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching sales" },
      { status: 500 }
    );
  }
};

export const findSalesByWeek: IFindSaleServerAction = async (args) => {
  await databaseConnection();
  if (!args) {
    return NextResponse.json(
      { error: "Year, month and week are required" },
      { status: 400 }
    );
  }

  const { year, month, week } = args;
  if (typeof year === "undefined" || typeof month === "undefined") {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }

  const startDateOfMonth = startOfMonth(new Date(year, month - 1));
  const endDateOfMonth = endOfMonth(new Date(year, month - 1));

  const weeksMap = new Map<string, { day: Date | null }>();

  const dates = eachDayOfInterval({
    start: startDateOfMonth,
    end: endDateOfMonth,
  });

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const week = getWeekOfMonth(date, { weekStartsOn: 1 });
    const weekKey = week.toString();
    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, {
        day: null,
      });
      const weekData = weeksMap.get(weekKey);
      if (weekData) {
        weekData.day = date;
      }
    }
  }

  if (typeof week === "undefined") {
    return NextResponse.json({ error: "Week is required" }, { status: 400 });
  }

  const weekKey = week.toString();
  const firstDayOfWeek = weeksMap.get(weekKey)?.day;

  if (!firstDayOfWeek) {
    return NextResponse.json(
      { error: "Invalid week specified" },
      { status: 400 }
    );
  }
  const weekDates = getWeekDates(firstDayOfWeek).map((date) =>
    format(date, "yyyy-MM-dd")
  );

  const salesData: SaleResponse[] = await Sale.find(
    {
      date: {
        $gte: weekDates[0],
        $lt: weekDates[weekDates.length - 1],
      },
    },
    "-__v"
  );

  if (!salesData) {
    return NextResponse.json(
      { error: "No sales found for the week" },
      { status: 404 }
    );
  }

  return NextResponse.json(salesData, { status: 200 });
};

export const findSaleByDay: IFindSaleServerAction = async (args) => {
  await databaseConnection();
  if (!args) {
    return NextResponse.json({ error: "Day is required" }, { status: 400 });
  }

  const { day } = args;
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

const findOldestSale = async () => {
  await databaseConnection();
  const sale: SaleResponse | null = await Sale.findOne({}, "-__v", {
    sort: { date: 1 },
  });
  if (!sale) throw new Error("No sales found");
  return sale.date;
};

export const findMissSalesForYear: IFindMissingSaleServerAction = async () => {
  await databaseConnection();
  const firstSaleDate = await findOldestSale();
  let start = startOfYear(new UTCDate(firstSaleDate));
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
            $gte: firstSaleDate,
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
