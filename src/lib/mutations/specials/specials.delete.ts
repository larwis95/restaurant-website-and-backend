import { IDeleteFunction } from "@/lib/api.interfaces";
import { SuccessResponse, ErrorResponse, ItemResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const deleteSpecial: IDeleteFunction<string, ItemResponse> = async (
  id: string
) => {
  try {
    const response = await fetch(`/api/special/${id}`, {
      method: "DELETE",
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
