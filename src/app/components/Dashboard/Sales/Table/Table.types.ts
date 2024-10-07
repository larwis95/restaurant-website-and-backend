import { QueryArgs } from "@/lib/hooks/hooks.types";

export type DynamicQueryState = {
  type: "currentweek" | "year" | "month" | "week" | "day";
  args: QueryArgs;
};
