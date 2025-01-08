import {
  ItemRequest,
  ItemResponse,
  MenuRequest,
  MenuResponse,
  SpecialRequest,
} from "@/lib/api.types";
import { IDeleteFunction, IPutFunction } from "@/lib/api.interfaces";

export interface IMenuItemProps {
  item: ItemResponse;

  className?: string;

  currentlyDragged?: boolean;

  mutationMap: {
    put: IPutFunction<ItemRequest | SpecialRequest, ItemResponse>;

    del: IDeleteFunction<string, ItemResponse>;
  };
}

export type ISortableProps = {
  items: ItemResponse[];
  category?: string;
  mutation: (arg: any) => any;
  mutationMap: {
    put: IPutFunction<ItemRequest | SpecialRequest, ItemResponse>;
    del: IDeleteFunction<string, ItemResponse>;
  };
};
