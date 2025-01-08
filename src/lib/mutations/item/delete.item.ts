import getErrorMessage from "@/lib/getErrorMessage";
import {
  DeleteResponse,
  ErrorResponse,
  ItemResponse,
  SuccessResponse,
} from "../../api.types";
import { IDeleteFunction } from "@/lib/api.interfaces";

export const deleteMutationForItem: IDeleteFunction<
  string,
  ItemResponse
> = async (_id: string) => {
  try {
    const response = await fetch(`/api/item`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data: SuccessResponse<ItemResponse> | ErrorResponse =
      await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
