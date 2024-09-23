import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SuccessResponse } from "../../api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteSaleByDate = async (
  date: Date
): Promise<ErrorResponse | SuccessResponse<undefined>> => {
  try {
    if (!date) {
      throw new Error("Date is required");
    }
    const response = await fetch(`/api/sales/${date}`, {
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
