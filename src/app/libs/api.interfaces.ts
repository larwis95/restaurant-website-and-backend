import {
  Year,
  Month,
  Week,
  Day,
  SaleResponse,
  ErrorResponse,
  FindSaleArgs,
} from "./api.types";
export interface IFindSaleServerAction {
  ({}: FindSaleArgs): Promise<SaleResponse[] | ErrorResponse>;
}
