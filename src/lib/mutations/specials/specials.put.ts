import { IPutFunction } from "@/lib/api.interfaces";
import { ErrorResponse, ItemResponse, SpecialRequest } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const putSpecial: IPutFunction<SpecialRequest, ItemResponse> = async ({
  _id,
  name,
  price,
  description,
  image,
}) => {
  try {
    const response = await fetch(`/api/special/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, price, description, image }),
    });
    const data: ItemResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const putActiveSpecial: IPutFunction<
  SpecialRequest[],
  ItemResponse[]
> = async (specials): Promise<ItemResponse[]> => {
  try {
    const response = await fetch(`/api/special/active`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specials }),
    });
    const data: ItemResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
