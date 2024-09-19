import databaseConnection from "@/lib/db";
import getErrorMessage from "@/lib/getErrorMessage";
import { Menu } from "@/models";
import { NextRequest, NextResponse } from "next/server";

const putMenuCategory = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { category, items } = body;
  await databaseConnection();
  try {
    if (!category || !items) {
      return NextResponse.json(
        { error: "Name and items are required" },
        { status: 400 }
      );
    }
    const menu = await Menu.findOneAndUpdate(
      { name: category },
      { items },
      { new: true }
    );
    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export default putMenuCategory;
