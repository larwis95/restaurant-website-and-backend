import { NextRequest, NextResponse } from "next/server";
import { Application } from "@/models";
import { ApplicationResponse } from "@/lib/api.types";
import databaseConnection from "@/lib/db";

const postApplication = async (req: NextRequest) => {
  const { body } = await req.json();
  const { name, email, phone, about, position } = body;

  if (!name || !email || !phone || !about || !position) {
    return NextResponse.json(
      { error: "Please provide all fields" },
      { status: 400 }
    );
  }

  await databaseConnection();

  try {
    const application: ApplicationResponse = await Application.create({
      name,
      email,
      phone,
      about,
      position,
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error creating application" },
      { status: 500 }
    );
  }
};

export default postApplication;
