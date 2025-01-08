import { IPostFunction } from "@/lib/api.interfaces";
import { ErrorResponse, ItemRequest, ItemResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const postMutationForItem: IPostFunction<
  ItemRequest,
  ItemResponse
> = async (item) => {
  try {
    const response = await fetch(`/api/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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
