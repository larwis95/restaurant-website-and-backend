import {
  ApplicationRequest,
  ApplicationResponse,
  ErrorResponse,
} from "@/lib/api.types";
import { IPostFunction } from "@/lib/api.interfaces";
import getErrorMessage from "@/lib/getErrorMessage";

export const postMutationForApplication: IPostFunction<
  ApplicationRequest,
  ApplicationResponse
> = async (application: ApplicationRequest) => {
  try {
    const response = await fetch(`/api/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });

    const data: ApplicationResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
