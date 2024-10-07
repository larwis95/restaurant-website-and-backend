import { NextResponse } from "next/server";
import {
  SaleResponse,
  ErrorResponse,
  FindSaleArgs,
  UpdateSaleFields,
  SuccessResponse,
  MissingDate,
} from "./api.types";
export interface IFindSaleServerAction {
  ({}: FindSaleArgs): Promise<NextResponse<SaleResponse[] | ErrorResponse>>;
}

export interface IFindMissingSaleServerAction {
  ({}: FindSaleArgs): Promise<
    NextResponse<SuccessResponse<MissingDate[]> | ErrorResponse>
  >;
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

export interface ICreateBulkSaleSeverAction {
  (sales: FindSaleArgs[]): Promise<SaleResponse[] | ErrorResponse>;
}
