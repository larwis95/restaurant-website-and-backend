import { NextRequest, NextResponse } from "next/server";
import { bulkCreateSales } from "@/app/libs/controllers/sales/createSale";
import getErrorMessage from "@/lib/getErrorMessage";

const postBulkSales = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  try {
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of sales" },
        { status: 400 }
      );
    }
    const sales = await bulkCreateSales(body);
    if (typeof sales === "object" && "error" in sales) {
      return NextResponse.json(sales, { status: 400 });
    }
    return NextResponse.json(sales, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { postBulkSales as POST };
