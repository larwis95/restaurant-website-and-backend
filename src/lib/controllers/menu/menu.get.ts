import { Menu } from "@/models";
import { MenuResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const getAllMenuCategories = async (
  req: NextRequest,
  res: NextResponse<MenuResponse[] | ErrorResponse>
) => {
  await databaseConnection();
  try {
    const menus = await Menu.find().populate("items");
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

const getMenuByCategoryName = async (
  req: NextRequest,
  context: { params: Params }
) => {
  const { category } = context.params;
  await databaseConnection();
  try {
    const menu = await Menu.find({
      name: category,
    }).populate("items");
    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export { getAllMenuCategories, getMenuByCategoryName };
