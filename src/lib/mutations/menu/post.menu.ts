import { IPostFunction } from "@/lib/api.interfaces";
import { MenuRequest, MenuResponse } from "@/lib/api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const postMutationForMenu: IPostFunction<
  MenuRequest,
  MenuResponse
> = async (menu) => {
  try {
    const response = await fetch(`/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
