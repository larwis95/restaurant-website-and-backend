export type ItemSchema = {
  name: string;
  price: number;
  description: string;
};

export type MenuSchema = {
  name: string;
  items: ItemSchema[];
};
