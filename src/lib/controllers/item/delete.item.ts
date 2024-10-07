import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, DeleteResponse } from "../../api.types";
import databaseConnection from "@/lib/db";
import { Item } from "@/models";
import getErrorMessage from "@/lib/getErrorMessage";

export const deleteItem = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<DeleteResponse | ErrorResponse>> => {
  const { _id } = await req.json();
  await databaseConnection();
  try {
    if (!_id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const item = await Item.findByIdAndDelete(_id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};
