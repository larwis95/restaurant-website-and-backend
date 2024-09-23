import getErrorMessage from "@/lib/getErrorMessage";
import { DeleteResponse, ErrorResponse } from "../../api.types";

export const deleteMutationForItem = async (
  _id: string
): Promise<DeleteResponse | ErrorResponse> => {
  try {
    const response = await fetch(`/api/item`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data: DeleteResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
