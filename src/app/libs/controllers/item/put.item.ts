import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, ItemResponse } from "../../api.types";
import databaseConnection from "@/lib/db";
import { Item } from "@/models";
import getErrorMessage from "@/lib/getErrorMessage";

export const putItem = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse | ErrorResponse>> => {
  const { _id, name, price, description } = await req.json();
  await databaseConnection();
  try {
    if (!_id && !name && !price && !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const item = await Item.findByIdAndUpdate(
      _id,
      { name, price, description },
      { new: true }
    );
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};
