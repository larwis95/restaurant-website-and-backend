"use server";
import { Sale } from "@/models";
import { getWeekOfMonth, startOfYear } from "date-fns";
import { IFindSaleServerAction } from "../../api.interfaces";
import databaseConnection from "@/lib/db";
import { NextResponse } from "next/server";
import { SaleResponse } from "../../api.types";

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
  const sales: SaleResponse[] = await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
      },
    },
    "-__v"
  );
  console.log("Month Sales: ", sales);
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
  console.log("weak sales happening");
  if (typeof year === "undefined" || typeof month === "undefined") {
    return NextResponse.json(
      { error: "Year and month are required" },
      { status: 400 }
    );
  }
  const weekSales = await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
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

  for (let i = 0; i < weekSales.length; i++) {
    const sale = weekSales[i];
    const weekOfMonth = getWeekOfMonth(sale.date);
    console.log(sale.date, weekOfMonth);
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
  console.log(day);
  const sale: SaleResponse | null = await Sale.findOne(
    {
      date: {
        $gte: new Date(`${day}T00:00:00.000Z`),
        $lt: new Date(`${day}T23:59:59.999Z`),
      },
    },
    "-__v"
  );
  console.log("Sale: ", sale);
  if (!sale) {
    return NextResponse.json(
      { error: "No sales found for the day" },
      { status: 404 }
    );
  }
  return NextResponse.json([sale], { status: 200 });
};
