import { useQuery } from "@tanstack/react-query";
import { UseDynamicSalesFetch } from "./hooks.types";
import { ErrorResponse, SaleResponse } from "../api.types";

export const useDynamicSalesFetch: UseDynamicSalesFetch = (
  queryMap,
  key,
  args
): {
  isPending: boolean;
  error: Error | null;
  data: SaleResponse[] | ErrorResponse | undefined;
} => {
  const { isPending, error, data } = useQuery({
    queryKey: [key, args],
    queryFn: async () => {
      return await queryMap[key](args ? args : {});
    },
  });
  return { isPending, error, data };
};
