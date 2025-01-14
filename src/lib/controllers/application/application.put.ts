import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import { ApplicationResponse } from "@/lib/api.types";
import databaseConnection from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const putApplication = async (req: NextRequest, context: Params) => {
  const body = await req.json();
  const { id } = context.params;

  if (!body) {
    return NextResponse.json({ error: "Body is required" }, { status: 400 });
  }

  await databaseConnection();

  try {
    const application: ApplicationResponse | null =
      await Application.findByIdAndUpdate(id, { ...body }, { new: true });

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
