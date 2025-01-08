import { IPostFunction } from "@/lib/api.interfaces";
import { ItemResponse, ErrorResponse, SpecialRequest } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const postSpecial: IPostFunction<SpecialRequest, ItemResponse> = async (
  special
) => {
  try {
    const response = await fetch(`/api/special`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(special),
    });
    const data: ItemResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postActiveSpecial = async (): Promise<
  ItemResponse[] | ErrorResponse
> => {
  try {
    const response = await fetch(`/api/special/active`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ItemResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
