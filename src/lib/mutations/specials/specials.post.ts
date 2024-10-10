import { SpecialResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

const postSpecial = async (body: {
  name: string;
  description: string;
  image: string;
  price: number;
}): Promise<SpecialResponse | ErrorResponse> => {
  try {
    const response = await fetch(`/api/special`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data: SpecialResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postActiveSpecial = async (): Promise<
  SpecialResponse[] | ErrorResponse
> => {
  try {
    const response = await fetch(`/api/special/active`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: SpecialResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default postSpecial;
