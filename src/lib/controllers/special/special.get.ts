import { NextRequest, NextResponse } from "next/server";
import { Special, ActiveSpecials } from "@/models";
import { ErrorResponse, ItemResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { ActiveSpecialsSchema } from "@/models/types";

const getSpecials = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse[] | ErrorResponse>> => {
  try {
    await databaseConnection();
    const specials = await Special.find();
    if (!specials) {
      return NextResponse.json(
        { error: "Specials not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(specials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const getSpecialsById = async (
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse<ItemResponse | ErrorResponse>> => {
  try {
    await databaseConnection();
    const { id } = context.params;
    const special = await Special.findById(id);
    if (!special) {
      return NextResponse.json({ error: "Special not found" }, { status: 404 });
    }
    return NextResponse.json(special, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export const getActiveSpecials = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<ItemResponse[] | ErrorResponse>> => {
  try {
    await databaseConnection();
    const activeSpecials: ActiveSpecialsSchema =
      await ActiveSpecials.findOne().populate("specials");
    if (!activeSpecials) {
      return NextResponse.json(
        { error: "Specials not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      activeSpecials.specials as unknown as ItemResponse[],
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { getSpecials, getSpecialsById };
