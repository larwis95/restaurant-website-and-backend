import { NextResponse } from "next/server";
import {
  SaleResponse,
  ErrorResponse,
  FindSaleArgs,
  UpdateSaleFields,
} from "./api.types";
export interface IFindSaleServerAction {
  ({}: FindSaleArgs): Promise<NextResponse<SaleResponse[] | ErrorResponse>>;
}

export interface IUpdateSaleSeverAction {
  ({}: {
    date: Date;
    fields: UpdateSaleFields;
  }): Promise<SaleResponse | ErrorResponse>;
}

export interface ICreateSaleSeverAction {
  ({}: {
    date: string;
    morning: number;
    night: number;
    holiday?: string;
  }): Promise<SaleResponse | ErrorResponse>;
}
