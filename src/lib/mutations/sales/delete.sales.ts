import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SuccessResponse } from "../../api.types";
import { IDeleteFunction } from "@/lib/api.interfaces";

export const deleteSaleByDate: IDeleteFunction<Date> = async (date) => {
  try {
    if (!date) {
      throw new Error("Date is required");
    }
    const response = await fetch(`/api/sales/${date}`, {
      method: "DELETE",
    });
    const data: SuccessResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
