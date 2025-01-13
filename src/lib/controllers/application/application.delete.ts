import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import databaseConnection from "@/lib/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const deleteApplication = async (req: NextRequest, context: Params) => {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await databaseConnection();

  try {
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error deleting application" },
      { status: 500 }
    );
  }
};

export default deleteApplication;
