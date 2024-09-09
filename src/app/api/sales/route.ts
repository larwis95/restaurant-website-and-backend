import { UpdateSaleFields } from "@/app/libs/api.types";
import { createSale } from "@/app/libs/controllers/sales/createSale";
import { updateSale } from "@/app/libs/controllers/sales/updateSale";
import getErrorMessage from "@/lib/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";

const putSale = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { date, fields }: { date: string; fields: UpdateSaleFields } = body;
  try {
    if (!date || !fields) {
      return NextResponse.json(
        { error: "Date and fields are required" },
        { status: 400 }
      );
    }
    const sale = await updateSale({ date: new Date(date), fields });
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
    if (!date || !morning || !night) {
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
