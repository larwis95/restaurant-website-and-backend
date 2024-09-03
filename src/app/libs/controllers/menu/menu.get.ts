import { Menu } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import { MenuResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/_db";
import { NextResponse } from "next/server";

const getAllMenus = async (
  req: NextApiRequest,
  res: NextApiResponse<MenuResponse[] | ErrorResponse>
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

const getMenu = async (
  req: NextApiRequest,
  res: NextApiResponse<MenuResponse | ErrorResponse>
) => {
  await databaseConnection();
  try {
    const menu = await Menu.findById(req.query.id).populate("items");
    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export { getAllMenus, getMenu };
