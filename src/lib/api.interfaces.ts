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
  (args?: FindSaleArgs): Promise<NextResponse<SaleResponse[] | ErrorResponse>>;
}
export interface IFindMissingSaleServerAction {
  (): Promise<NextResponse<SuccessResponse<MissingDate[]> | ErrorResponse>>;
}

export interface IPostFunction<T = void, S = void> {
  (arg: T): Promise<S>;
}

export interface IPutFunction<T = void, S = void> {
  (arg: T): Promise<S>;
}

export interface IDeleteFunction<T = void, S = void> {
  (arg: T): Promise<SuccessResponse<S>>;
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
