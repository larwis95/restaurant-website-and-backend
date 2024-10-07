import { ErrorResponse, ItemPostRequest, ItemResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const postMutationForItem = async (
  item: ItemPostRequest
): Promise<ItemResponse | ErrorResponse> => {
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
