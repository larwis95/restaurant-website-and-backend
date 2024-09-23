import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const userController = async (req: NextRequest, res: NextResponse) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user: token }, { status: 200 });
};

export default userController;
