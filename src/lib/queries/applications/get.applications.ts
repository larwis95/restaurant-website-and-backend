import { ApplicationResponse, ErrorResponse } from "@/lib/api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const getApplications = async (): Promise<ApplicationResponse[]> => {
  try {
    const response = await fetch("/api/application");
    const data: ApplicationResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getApplicationById = async (
  id: string
): Promise<ApplicationResponse> => {
  try {
    const response = await fetch(`/api/application/${id}`);
    const data: ApplicationResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
