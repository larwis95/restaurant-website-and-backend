import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SaleRequest, SaleResponse } from "../../api.types";
import { IPostFunction } from "@/lib/api.interfaces";

export const addSale: IPostFunction<SaleRequest, SaleResponse> = async (
  sale
) => {
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

export const bulkAddSales: IPostFunction<
  SaleRequest[],
  SaleResponse[]
> = async (sales) => {
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
