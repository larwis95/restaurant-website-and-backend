import databaseConnection from "@/lib/db";
import getErrorMessage from "@/lib/getErrorMessage";
import { Menu } from "@/models";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, ItemResponse, MenuResponse } from "../../api.types";

export const putMenuByCategory = async (
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse<MenuResponse | ErrorResponse>> => {
  const { category } = context.params;
  const { items }: { items: ItemResponse[] } = await req.json();
  try {
    await databaseConnection();
    const menu: MenuResponse | null = await Menu.findOneAndUpdate(
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
