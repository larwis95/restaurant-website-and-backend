import getErrorMessage from "@/lib/getErrorMessage";
import { ErrorResponse, SpecialResponse } from "../../api.types";

const getSpecials = async (): Promise<SpecialResponse[]> => {
  try {
    const response = await fetch("/api/special", { cache: "no-store" });
    const data: SpecialResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getSpecialById = async (id: string): Promise<SpecialResponse> => {
  try {
    const response = await fetch(`/api/special/${id}`);
    const data: SpecialResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getSpecialsServerAction = async (): Promise<SpecialResponse[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("Specials Server Action", apiUrl);
  try {
    const response = await fetch(`${apiUrl}/special`);
    const data: SpecialResponse[] | ErrorResponse = await response.json();
    console.log("Specials data", data);
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getActiveSpecials = async (): Promise<SpecialResponse[]> => {
  try {
    const response = await fetch("/api/special/active");
    const data: SpecialResponse[] | ErrorResponse = await response.json();
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
