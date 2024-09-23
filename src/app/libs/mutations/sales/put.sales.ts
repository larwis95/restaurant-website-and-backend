import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SaleResponse, UpdateSaleFields } from "../../api.types";

export const updateSale = async ({
  date,
  fields,
}: {
  date: Date;
  fields: UpdateSaleFields;
}) => {
  try {
    const response = await fetch(`/api/sales`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, fields }),
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
