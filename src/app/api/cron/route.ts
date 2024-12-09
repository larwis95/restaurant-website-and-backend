import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import getErrorMessage from "@/lib/getErrorMessage";

const handler = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    revalidatePath("/api/prediction");
    return NextResponse.json({
      message: "Revalidation successful",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

export { handler as GET };
