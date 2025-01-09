import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import databaseConnection from "@/lib/db";

const deleteApplication = async (req: NextRequest) => {
  const { body } = await req.json();
  const { _id } = body;

  if (!_id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await databaseConnection();

  try {
    const application = await Application.findByIdAndDelete(_id);

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
