import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import { ApplicationResponse } from "@/lib/api.types";
import databaseConnection from "@/lib/db";

const putApplication = async (req: NextRequest) => {
  const { body } = await req.json();
  const { _id, name, email, phone, about, position } = body;

  if (!_id || !name || !email || !phone || !about || !position) {
    return NextResponse.json(
      { error: "Please provide all fields" },
      { status: 400 }
    );
  }

  await databaseConnection();

  try {
    const application: ApplicationResponse | null =
      await Application.findByIdAndUpdate(
        _id,
        { name, email, phone, about, position },
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
