import getErrorMessage from "@/lib/getErrorMessage";
import {
  ErrorResponse,
  ItemResponse,
  MenuRequest,
  MenuResponse,
} from "../../api.types";
import { IPutFunction } from "@/lib/api.interfaces";

export const putMutatiuonForMenu: IPutFunction<
  MenuRequest,
  MenuResponse
> = async (menu) => {
  try {
    const response = await fetch(`/api/menu/${menu.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
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
