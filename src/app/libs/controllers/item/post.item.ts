import databaseConnection from "@/lib/db";
import getErrorMessage from "@/lib/getErrorMessage";
import { Item, Menu } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, ItemResponse } from "../../api.types";

export const postItem = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse | ErrorResponse>> => {
  const { name, price, description, category, image } = await req.json();
  await databaseConnection();
  try {
    if (!name || !price || !description || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const item = await Item.create({ name, price, description, image });
    const updatedMenu = await Menu.updateOne(
      { name: category },
      { $addToSet: { items: item._id } },
      { new: true }
    );
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};
