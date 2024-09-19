import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, ItemResponse } from "../../api.types";

export const putMutationForItem = async ({
  _id,
  name,
  price,
  description,
}: ItemResponse): Promise<ItemResponse> => {
  try {
    const response = await fetch(`/api/item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, price, description }),
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
