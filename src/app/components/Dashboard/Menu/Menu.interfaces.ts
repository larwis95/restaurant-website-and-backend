import { DeleteResponse, ErrorResponse, ItemResponse } from "@/lib/api.types";
import { mutationFn } from "./types.menu";

export interface IMenuItemProps {
  item: ItemResponse;
  className?: string;
  currentlyDragged?: boolean;
  mutationMap: {
    put: ({
      _id,
      name,
      price,
      description,
      image,
    }: {
      _id: string;
      name: string;
      price: number | { small?: number; medium?: number; large?: number };
      description: string;
      image: string;
    }) => Promise<ItemResponse>;
    del: (id: string) => Promise<DeleteResponse | ErrorResponse>;
  };
}

export interface ISortableProps {
  items: ItemResponse[];
  category?: string;
  mutation: mutationFn;
  mutationMap: {
    put: ({
      _id,
      name,
      price,
      description,
      image,
    }: {
      _id: string;
      name: string;
      price: number;
      description: string;
      image: string;
    }) => Promise<ItemResponse>;
    del: (id: string) => Promise<DeleteResponse | ErrorResponse>;
  };
}
