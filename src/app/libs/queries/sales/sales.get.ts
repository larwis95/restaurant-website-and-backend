import { ErrorResponse, SaleResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const fetchSalesForCurrentWeek = async (): Promise<SaleResponse[]> => {
  const response = await fetch(`http://localhost:3000/api/sales/week`);
  const data = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data as SaleResponse[];
};
