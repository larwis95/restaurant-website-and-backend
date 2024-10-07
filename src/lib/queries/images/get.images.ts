import { SuccessResponse } from "../../api.types";

export const fetchImages = async (): Promise<
  SuccessResponse<{ urls: string[] }>
> => {
  const response = await fetch(`/api/upload/image`);
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
};
