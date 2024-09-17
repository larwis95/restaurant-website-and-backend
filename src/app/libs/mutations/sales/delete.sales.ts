import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SuccessResponse } from "../../api.types";

export const deleteSaleByDate = async (
  date: Date
): Promise<ErrorResponse | SuccessResponse> => {
  try {
    if (!date) {
      throw new Error("Date is required");
    }
    const response = await fetch(`http://localhost:3000/api/sales/${date}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
