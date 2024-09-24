import { ErrorResponse, SuccessResponse } from "@/app/libs/api.types";
import getErrorMessage from "@/lib/getErrorMessage";
import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const postImage = async (
  req: NextRequest
): Promise<NextResponse<SuccessResponse<{ url: string }> | ErrorResponse>> => {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("filename");
  const body = await req.blob();
  if (!fileName) {
    return NextResponse.json(
      { error: "No file name provided" },
      { status: 400 }
    );
  }

  try {
    const blob = await put(fileName, body, {
      access: "public",
    });

    const { url } = blob;

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        data: {
          url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
};

const getImages = async (
  req: NextRequest
): Promise<
  NextResponse<SuccessResponse<{ urls: string[] }> | ErrorResponse>
> => {
  const images = await list();
  const urls = images.blobs.map((blob) => blob.url);

  return NextResponse.json(
    {
      message: "Images fetched successfully",
      data: {
        urls,
      },
    },
    { status: 200 }
  );
};

export { postImage as POST, getImages as GET };
