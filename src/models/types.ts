export type ItemSchema = {
  name: string;
  price: number;
  description: string;
};

export type MenuSchema = {
  name: string;
  items: ItemSchema[];
};

export type SaleSchema = {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
};
