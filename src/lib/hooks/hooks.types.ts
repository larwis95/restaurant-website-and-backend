import { SaleResponse } from "../api.types";

export type QueryMap = {
  [key: string]: QueryFn;
};

export type QueryFn = ({
  year,
  month,
  week,
  day,
}?: QueryArgs) => Promise<SaleResponse[]>;

export type UseDynamicSalesFetch = (
  queryMap: QueryMap,
  key: string,
  args?: QueryArgs
) => {
  isPending: boolean;
  error: Error | null;
  data: SaleResponse[] | undefined;
};

export type QueryArgs = {
  year?: number;
  month?: number;
  week?: number;
  day?: string;
};
