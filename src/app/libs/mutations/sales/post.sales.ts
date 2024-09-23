import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SaleRequest, SaleResponse } from "../../api.types";

export const addSale = async (sale: SaleRequest): Promise<SaleResponse> => {
  try {
    const response = await fetch(`/api/sales`, {
      method: "POST",
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

export const bulkAddSales = async (
  sales: SaleRequest[]
): Promise<SaleResponse[]> => {
  try {
    const response = await fetch(`/api/sales/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sales),
    });
    const data: SaleResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
