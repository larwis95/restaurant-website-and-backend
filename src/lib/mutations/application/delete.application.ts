import {
  SuccessResponse,
  ApplicationResponse,
  ErrorResponse,
} from "@/lib/api.types";
import { IDeleteFunction } from "@/lib/api.interfaces";
import getErrorMessage from "@/lib/getErrorMessage";

export const deleteMutationForApplication: IDeleteFunction<
  string,
  ApplicationResponse
> = async (_id: string) => {
  try {
    const response = await fetch(`/api/application`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const data: SuccessResponse<ApplicationResponse> | ErrorResponse =
      await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
