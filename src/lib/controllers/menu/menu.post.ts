import databaseConnection from "@/lib/db";
import getErrorMessage from "@/lib/getErrorMessage";
import { Menu } from "@/models";
import { NextRequest, NextResponse } from "next/server";

const postMenuCategory = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { name } = body;
  await databaseConnection();
  try {
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const menu = await Menu.create({ name });
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export default postMenuCategory;
