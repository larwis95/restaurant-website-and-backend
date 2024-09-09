import { Sale } from "@/models";
import getErrorMessage from "@/lib/getErrorMessage";
import { IUpdateSaleSeverAction } from "../../api.interfaces";
import { format } from "date-fns";

export const updateSale: IUpdateSaleSeverAction = async ({ date, fields }) => {
  try {
    console.log("Date: ", date);
    const sale = await Sale.findOneAndUpdate({ date: date }, fields, {
      new: true,
    });
    if (!sale) {
      throw new Error("Sale not found");
    }
    return sale;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};
