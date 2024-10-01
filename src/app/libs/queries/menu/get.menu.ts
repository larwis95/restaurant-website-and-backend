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

export const fetchAllMenusServerAction = async (): Promise<
  MenuResponse[] | ErrorResponse
> => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  console.log("apiURL", apiURL);
  try {
    const response = await fetch(`${apiURL}/menu`, {
      cache: "no-store",
    });
    const data: MenuResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      console.log(data);
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
