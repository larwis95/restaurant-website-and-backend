"use server";
import { Sale } from "@/models";
import { getWeek, getWeekOfMonth, isSameWeek, startOfYear } from "date-fns";
import { IFindSaleServerAction } from "../../api.interfaces";
import databaseConnection from "@/lib/db";
import { get } from "http";

export const findSalesByYear: IFindSaleServerAction = async ({ year }) => {
  await databaseConnection();
  if (typeof year === "undefined") {
    return { error: "Year is required" };
  }
  const start = startOfYear(new Date(year, 0, 1));
  const end = new Date(year, 11, 31);
  return await Sale.find(
    {
      date: {
        $gte: start,
        $lt: end,
      },
    },
    "-__v"
  );
};

export const findSalesByMonth: IFindSaleServerAction = async ({
  year,
  month,
}) => {
  await databaseConnection();
  return await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
      },
    },
    "-__v"
  );
};

export const findSalesByWeek: IFindSaleServerAction = async ({
  year,
  month,
  week,
}) => {
  await databaseConnection();
  console.log("weak sales happening");
  if (typeof year === "undefined" || typeof month === "undefined") {
    console.log("year and month are required");
    return { error: "Year and month are required" };
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
  console.log(weekSales);
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
    return { error: "Week is required" };
  }

  return weeksMap.get(week);
};

export const findSaleByDay: IFindSaleServerAction = async ({ day }) => {
  await databaseConnection();
  if (typeof day === "undefined") {
    return { error: "Day is required" };
  }
  const sale = await Sale.findOne(
    {
      date: {
        $gte: new Date(day),
        $lt: new Date(day).setDate(new Date(day).getDate() + 1),
      },
    },
    "-__v"
  );
  console.log(sale);
  if (!sale) {
    return { error: "No sales found for this day" };
  }
  return [sale];
};
