import { QueryArgs } from "@/app/libs/hooks/hooks.types";

export type DynamicQueryState = {
  type: "currentweek" | "year" | "month" | "week" | "day";
  args: QueryArgs;
};
