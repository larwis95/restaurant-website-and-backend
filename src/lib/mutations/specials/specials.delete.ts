import {
  SuccessResponse,
  ErrorResponse,
  SpecialResponse,
} from "../../api.types";
import getErrorMessage from "@/lib/getErrorMessage";

const deleteSpecial = async (
  id: string
): Promise<SuccessResponse<SpecialResponse> | ErrorResponse> => {
  try {
    const response = await fetch(`/api/special/${id}`, {
      method: "DELETE",
    });
    const data: SuccessResponse<SpecialResponse> | ErrorResponse =
      await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default deleteSpecial;
