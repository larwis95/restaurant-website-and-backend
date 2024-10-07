import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, ItemResponse, MenuResponse } from "../../api.types";

export const putMutatiuonForMenu = async (
  category: string,
  items: ItemResponse[]
) => {
  try {
    const response = await fetch(`/api/menu/${category}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });
    const data: MenuResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
