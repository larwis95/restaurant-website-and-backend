import { NextRequest, NextResponse } from "next/server";
import { Special, ActiveSpecials } from "@/models";
import { ErrorResponse, ItemResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";

const postSpecial = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse | ErrorResponse>> => {
  try {
    await databaseConnection();
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

export const postActiveSpecial = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse | ErrorResponse>> => {
  try {
    await databaseConnection();
    const checkActiveSpecial: ItemResponse[] = await ActiveSpecials.find();
    if (checkActiveSpecial.length > 0) {
      return NextResponse.json(
        { error: "Active special already exists" },
        { status: 400 }
      );
    }
    const activeSpecials = await ActiveSpecials.create({ specials: [] });
    if (!activeSpecials) {
      return NextResponse.json(
        { error: "Active special not created" },
        { status: 400 }
      );
    }
    return NextResponse.json(activeSpecials, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export default postSpecial;
