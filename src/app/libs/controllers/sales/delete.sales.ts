import getErrorMessage from "@/lib/getErrorMessage";
import { Sale } from "@/models";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/db";

const deleteSaleByDate = async (
  req: NextRequest,
  context: { params: Params }
) => {
  const { date } = context.params;
  try {
    await databaseConnection();
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    const sale = await Sale.deleteOne({ date });
    if (!sale) {
      return NextResponse.json(
        { error: "No sale found for the date" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Sale deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export default deleteSaleByDate;
