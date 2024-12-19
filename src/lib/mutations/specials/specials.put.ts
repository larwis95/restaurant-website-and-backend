import { SpecialResponse, ErrorResponse } from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

const putSpecial = async ({
  _id,
  name,
  price,
  description,
  image,
}: {
  _id: string;
  name: string;
  price: number | { small?: number; medium?: number; large?: number };
  description: string;
  image: string;
}): Promise<SpecialResponse> => {
  try {
    const response = await fetch(`/api/special/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, price, description, image }),
    });
    const data: SpecialResponse | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const putActiveSpecial = async ({
  specials,
}: {
  specials: SpecialResponse[];
}): Promise<SpecialResponse[]> => {
  try {
    const response = await fetch(`/api/special/active`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specials }),
    });
    const data: SpecialResponse[] | ErrorResponse = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default putSpecial;
