import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import getErrorMessage from "@/lib/getErrorMessage";
import { Application } from "@/models";
import databaseConnection from "@/lib/db";

const deleteRejectedApplications = async () => {
  try {
    await databaseConnection();
    const applications = await Application.find({ status: "rejected" });
    if (applications.length === 0) {
      return;
    }
    await Application.deleteMany({ status: "rejected" });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const revalidatePrediction = async () => {
  revalidatePath("/api/prediction");
  return NextResponse.json({
    message: "Revalidation successful",
    status: 200,
  });
};

const handler = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await deleteRejectedApplications();
    await revalidatePrediction();
    return NextResponse.json(
      { message: "Cron job successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { handler as GET };
