import { Sale } from "@/models";
import { NextApiResponse } from "next";
import { SaleResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { startOfWeek, endOfWeek } from "date-fns";
import {
  findMissSalesForYear,
  findSaleByDay,
  findSalesByCurrentWeek,
  findSalesByMonth,
  findSalesByPreviousWeek,
  findSalesByWeek,
  findSalesByYear,
} from "./findSale";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Console } from "console";

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
  const { year, month, week, current, previous } = params;

  if (!current && !previous) {
    return await findSalesByWeek({
      year: parseInt(year),
      month: parseInt(month),
      week: parseInt(week),
    });
  }

  if (current) {
    return await findSalesByCurrentWeek();
  }
  if (previous) {
    return await findSalesByPreviousWeek();
  }
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
    return await findSalesByYear({ year: parseInt(year) });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const getMissingSalesDates = async (
  req: NextRequest,
  res: NextResponse
) => {
  try {
    return await findMissSalesForYear();
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
