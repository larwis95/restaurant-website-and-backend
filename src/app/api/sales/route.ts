import { UpdateSaleFields } from "@/lib/api.types";
import { createSale } from "@/lib/controllers/sales/createSale";
import { updateSale } from "@/lib/controllers/sales/updateSale";
import getErrorMessage from "@/lib/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

const putSale = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { date, morning, night, holiday } = body;
  try {
    if (!date || morning === undefined || night === undefined) {
      return NextResponse.json(
        { error: "Date and fields are required" },
        { status: 400 }
      );
    }
    const sale = await updateSale({
      date: new Date(date),
      fields: { morning, night, holiday },
    });
    if (typeof sale === "object" && "error" in sale) {
      return NextResponse.json(sale, { status: 400 });
    }
    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

const postSale = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { date, morning, night, holiday } = body;
  try {
    if (!date || morning === undefined || night === undefined) {
      return NextResponse.json(
        {
          error: "Missing required fields. Expected Date, Morning, and Night.",
        },
        { status: 400 }
      );
    }
    const sale = await createSale({ date, morning, night, holiday });
    if (typeof sale === "object" && "error" in sale) {
      return NextResponse.json(sale, { status: 400 });
    }
    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export { putSale as PUT, postSale as POST };
