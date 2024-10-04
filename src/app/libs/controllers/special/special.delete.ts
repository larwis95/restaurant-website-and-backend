import { NextRequest, NextResponse } from "next/server";
import { Special } from "@/models";
import {
  ErrorResponse,
  SpecialResponse,
  SuccessResponse,
} from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";

const deleteSpecial = async (
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse<SuccessResponse<SpecialResponse> | ErrorResponse>> => {
  try {
    await databaseConnection();
    const { id } = context.params;
    const deletedSpecial = await Special.findByIdAndDelete({ _id: id });
    if (!deletedSpecial) {
      return NextResponse.json(
        { error: "Special not deleted" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Special deleted", data: deletedSpecial },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export default deleteSpecial;
