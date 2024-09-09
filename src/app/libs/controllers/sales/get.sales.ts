import { Sale } from "@/models";
import next, { NextApiResponse } from "next";
import { SaleResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { startOfWeek, endOfWeek } from "date-fns";
import {
  findSaleByDay,
  findSalesByMonth,
  findSalesByWeek,
  findSalesByYear,
} from "./findSale";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getAllSales = async (
  req: NextRequest,
  res: NextApiResponse<SaleResponse[] | ErrorResponse>
) => {
  await databaseConnection();
  try {
    const sales = await Sale.find();
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const getSaleForDate = async (
  req: NextRequest,
  context: { params: Params }
) => {
  const { date } = context.params;
  console.log("Date: ", date);
  try {
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    return await findSaleByDay({ day: date });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const getWeekSales = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams.entries();
  const params = Object.fromEntries(searchParams);
  const { year, month, week, current } = params;
  console.log("search Params", { year, month, week, current });
  if (!current) {
    return await findSalesByWeek({
      year: parseInt(year),
      month: parseInt(month),
      week: parseInt(week),
    });
  }
  const now = new Date();
  const start = startOfWeek(now);
  const end = endOfWeek(now);
  const currentWeekSales = await Sale.find({
    date: {
      $gte: start,
      $lt: end,
    },
  });
  if (!currentWeekSales) {
    return { error: "No sales found for the current week", status: 404 };
  }
  return NextResponse.json(currentWeekSales, { status: 200 });
};

export const getMonthSales = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams.entries();
  const params = Object.fromEntries(searchParams);
  const { year, month } = params;
  try {
    const monthSales = await findSalesByMonth({
      year: parseInt(year),
      month: parseInt(month),
    });
    if (!monthSales) {
      return NextResponse.json(
        { error: "No sales found for the month" },
        { status: 404 }
      );
    }
    return monthSales;
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const getYearSales = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams.entries();
  const params = Object.fromEntries(searchParams);
  const { year } = params;
  try {
    const yearSales = await findSalesByYear({ year: parseInt(year) });
    if (!yearSales) {
      return NextResponse.json(
        { error: "No sales found for the year" },
        { status: 404 }
      );
    }
    return yearSales;
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
