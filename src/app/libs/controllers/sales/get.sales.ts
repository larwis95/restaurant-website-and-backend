import { Sale } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { SaleResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { NextResponse } from "next/server";

const getAllSales = async (
  req: NextApiRequest,
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
