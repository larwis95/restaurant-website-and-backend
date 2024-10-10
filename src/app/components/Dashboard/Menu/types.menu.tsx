import { ItemResponse, MenuResponse, SpecialResponse } from "@/lib/api.types";

export type mutationFn = (
  ...args: any[]
) => Promise<ItemResponse | MenuResponse | SpecialResponse[]>;
