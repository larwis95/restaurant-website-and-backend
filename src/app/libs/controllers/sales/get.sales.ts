import { Sale } from "@/models";
import { NextApiResponse } from "next";
import { SaleResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { startOfWeek, endOfWeek } from "date-fns";
import { SaleSchema } from "@/models/types";

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

export const getSalesbyWeek = async (
  req: NextRequest,
  res: NextApiResponse
) => {
  await databaseConnection();
  try {
    const sales: SaleSchema[] = await Sale.find(
      {
        date: {
          $gte: startOfWeek(new Date()),
          $lt: endOfWeek(new Date()),
        },
      },
      "-__v"
    );
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
