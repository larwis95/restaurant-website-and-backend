import getErrorMessage from "@/lib/getErrorMessage";
import { ICreateSaleSeverAction } from "../../api.interfaces";
import { Sale } from "@/models";

export const createSale: ICreateSaleSeverAction = async ({
  date,
  morning,
  night,
  holiday,
}) => {
  try {
    const sale = await Sale.create({
      date,
      morning,
      night,
      holiday: holiday || "No",
    });
    return sale;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};
