import getErrorMessage from "@/lib/getErrorMessage";
import {
  ICreateBulkSaleSeverAction,
  ICreateSaleSeverAction,
} from "../../api.interfaces";
import { Sale } from "@/models";
import { data } from "@tensorflow/tfjs";
import { SaleRequest, SaleResponse } from "../../api.types";

export const createSale: ICreateSaleSeverAction = async ({
  date,
  morning,
  night,
  holiday,
}) => {
  try {
    const sale: SaleResponse = await Sale.create({
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

export const bulkCreateSales: ICreateBulkSaleSeverAction = async (sales) => {
  try {
    const bulkSales: SaleResponse[] = await Sale.insertMany(sales);
    return bulkSales;
  } catch (error) {
    const message = getErrorMessage(error);
    return { error: message };
  }
};
