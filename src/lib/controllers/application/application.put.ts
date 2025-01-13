import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import { ApplicationResponse } from "@/lib/api.types";
import databaseConnection from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const putApplication = async (req: NextRequest, context: Params) => {
  const { body } = await req.json();
  const { id: id } = context.params;
  const { name, email, phone, about, position, status } = body;

  if (!id || !name || !email || !phone || !about || !position || !status) {
    return NextResponse.json(
      { error: "Please provide all fields" },
      { status: 400 }
    );
  }

  await databaseConnection();

  try {
    const application: ApplicationResponse | null =
      await Application.findByIdAndUpdate(
        id,
        { name, email, phone, about, position, status },
        { new: true }
      );

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error updating application" },
      { status: 500 }
    );
  }
};

export default putApplication;
