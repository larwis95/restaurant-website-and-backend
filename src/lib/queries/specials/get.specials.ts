import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, ItemResponse } from "../../api.types";

const getSpecials = async (): Promise<ItemResponse[]> => {
  try {
    const response = await fetch("/api/special", { cache: "no-store" });
    const data: ItemResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getSpecialById = async (id: string): Promise<ItemResponse> => {
  try {
    const response = await fetch(`/api/special/${id}`);
    const data: ItemResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getSpecialsServerAction = async (): Promise<ItemResponse[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}/special`);
    const data: ItemResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getActiveSpecials = async (): Promise<ItemResponse[]> => {
  try {
    const response = await fetch("/api/special/active");
    const data: ItemResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export {
  getSpecials,
  getSpecialById,
  getSpecialsServerAction,
  getActiveSpecials,
};
