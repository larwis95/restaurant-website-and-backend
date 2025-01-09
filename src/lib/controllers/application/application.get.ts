import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import { ApplicationResponse } from "@/lib/api.types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import databaseConnection from "@/lib/db";

export const getAllApplications = async (req: NextRequest) => {
  await databaseConnection();
  try {
    const applications: ApplicationResponse[] = await Application.find();
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching applications" },
      { status: 500 }
    );
  }
};

export const getApplicationById = async (
  req: NextRequest,
  context: { params: Params }
) => {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await databaseConnection();

  try {
    const application: ApplicationResponse | null =
      await Application.findById(id);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error fetching application" },
      { status: 500 }
    );
  }
};
