import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SaleResponse, UpdateSaleFields } from "../../api.types";
import { IPutFunction } from "@/lib/api.interfaces";

export const updateSale: IPutFunction<SaleResponse, SaleResponse> = async (
  sale
) => {
  try {
    const response = await fetch(`/api/sales`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
    const data: SaleResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
