import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, ItemRequest, ItemResponse } from "../../api.types";
import { IPutFunction } from "@/lib/api.interfaces";

export const putMutationForItem: IPutFunction<
  ItemRequest,
  ItemResponse
> = async ({ _id, name, price, description, image }): Promise<ItemResponse> => {
  try {
    const response = await fetch(`/api/item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, price, description, image }),
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
