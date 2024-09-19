import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, MenuResponse } from "../../api.types";

export const fetchAllMenus = async (): Promise<
  MenuResponse[] | ErrorResponse
> => {
  try {
    const response = await fetch(`/api/menu`);
    const data: MenuResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const fetchMenuByCategory = async (
  category: String
): Promise<MenuResponse | ErrorResponse> => {
  try {
    const response = await fetch(`/api/menu/${category}`);
    const data: MenuResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
