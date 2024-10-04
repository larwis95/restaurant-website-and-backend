import { NextRequest, NextResponse } from "next/server";
import { Special } from "@/models";
import { ErrorResponse, SpecialResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

const postSpecial = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<SpecialResponse | ErrorResponse>> => {
  try {
    const { name, description, image, price } = await req.json();
    const createdSpecial = await Special.create({
      name,
      description,
      image,
      price,
    });
    if (!createdSpecial) {
      return NextResponse.json(
        { error: "Special not created" },
        { status: 400 }
      );
    }
    return NextResponse.json(createdSpecial, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export default postSpecial;
