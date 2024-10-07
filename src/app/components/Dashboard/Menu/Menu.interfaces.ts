import { ItemResponse } from "@/lib/api.types";

export interface IMenuItemProps {
  item: ItemResponse;
  className?: string;
  currentlyDragged?: boolean;
}
