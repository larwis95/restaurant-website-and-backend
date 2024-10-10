import { NextRequest, NextResponse } from "next/server";
import { Special, ActiveSpecials } from "@/models";
import { ErrorResponse, SpecialResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import databaseConnection from "@/lib/db";

const putSpecial = async (
  req: NextRequest,
  context: { params: Params }
): Promise<NextResponse<SpecialResponse | ErrorResponse>> => {
  try {
    await databaseConnection();
    const { name, description, image, price } = await req.json();
    const { id } = context.params;
    const updatedSpecial = await Special.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        image,
        price,
      }
    );
    if (!updatedSpecial) {
      return NextResponse.json(
        { error: "Special not updated" },
        { status: 400 }
      );
    }
    return NextResponse.json(updatedSpecial, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export const putActiveSpecial = async (
  req: NextRequest
): Promise<NextResponse<SpecialResponse[] | ErrorResponse>> => {
  try {
    await databaseConnection();
    const { specials } = await req.json();
    const checkActiveSpecial: SpecialResponse[] = await ActiveSpecials.find();
    if (checkActiveSpecial.length === 0) {
      await ActiveSpecials.create({ specials });
      return NextResponse.json(specials, { status: 201 });
    }
    const updatedActiveSpecial = await ActiveSpecials.findByIdAndUpdate(
      { _id: checkActiveSpecial[0]._id },
      {
        specials,
      }
    ).populate("specials");

    if (!updatedActiveSpecial) {
      return NextResponse.json(
        { error: "Active special not updated" },
        { status: 400 }
      );
    }
    return NextResponse.json(updatedActiveSpecial.specials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export default putSpecial;
