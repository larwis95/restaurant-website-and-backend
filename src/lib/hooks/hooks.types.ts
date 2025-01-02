import { UseQueryResult } from "@tanstack/react-query";
import { ErrorResponse, SaleResponse } from "../api.types";

export type QueryMap = {
  [key: string]: QueryFn;
};

export type QueryFn = ({
  year,
  month,
  week,
  day,
}: QueryArgs) => Promise<SaleResponse[]>;

export type UseDynamicSalesFetch = (
  queryMap: QueryMap,
  key: string,
  args?: QueryArgs
) => {
  isPending: boolean;
  error: Error | null;
  data: SaleResponse[] | ErrorResponse | undefined;
};

export type QueryArgs = {
  year?: number;
  month?: number;
  week?: number;
  day?: string;
};

export type UseSalesResponse = {
  currentWeek: UseQueryResult<SaleResponse[], Error>;
  prevWeek: UseQueryResult<SaleResponse[], Error>;
  currentMonth: UseQueryResult<SaleResponse[], Error>;
  prevMonth: UseQueryResult<SaleResponse[], Error>;
  currentYear: UseQueryResult<SaleResponse[], Error>;
  prevYear: UseQueryResult<SaleResponse[], Error>;
};
