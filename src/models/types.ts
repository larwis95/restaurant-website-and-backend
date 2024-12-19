export type ItemSchema = {
  name: string;
  price: Price;
  description: string;
  image: string;
};

export type Price =
  | number
  | {
      small?: number;
      medium?: number;
      large?: number;
      xl?: number;
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

export type SpecialSchema = {
  name: string;
  description: string;
  image: string;
  price: number;
  active: boolean;
};

export type ActiveSpecialsSchema = {
  specials: SpecialSchema[];
};
