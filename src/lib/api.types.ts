import { SaleSchema } from "@/models/types";

export type ErrorResponse = {
  error: string;
};

export type MenuResponse = {
  _id: string;
  name: string;
  items: ItemResponse[];
};

export type PostItemArg = {
  name: string;
  price: number;
  description: string;
  category: string;
};

export type PostSaleArg = {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
};

export type PutSaleArg = {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
};

export type PutItemArg = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export type ItemResponse = {
  _id: string;
  name: string;
  price: number | { small?: number; medium?: number; large?: number };
  description: string;
  image: string;
  category?: string;
};

export type SaleResponse = {
  _id: string;
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
};

export type DeleteResponse = {
  message: string;
};

export type SuccessResponse<T = void> = {
  message: string;
  data?: T | null;
};

export type MissingDate = {
  _id: null;
  dates: Date[];
};

export type TikTokOembedResponse = {
  author_name: string;
  author_url: string;
  height: number;
  html: string | TrustedHTML;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  version: string;
  width: number;
};

export type TrainingData = SaleSchema[];

export type MorningData = {
  date: Date;
  sales: number;
};

export type NightData = {
  date: Date;
  sales: number;
};

export type TikTokGetResponse = [boolean, TikTokOembedResponse];

export type Month = number;

export type Year = number;

export type Week = number;

export type Day = string;

export type FindSaleArgs = {
  year?: Year;
  month?: Month;
  week?: Week;
  day?: Day;
};

export type UpdateSaleFields = {
  morning?: number;
  night?: number;
  holiday?: string;
};

export type SaleRequest = {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
};

export type ItemRequest = {
  _id?: string;
  name: string;
  price:
    | {
        small?: number;
        medium?: number;
        large?: number;
      }
    | number;
  description: string;
  image?: string;
  category?: string;
};

export type SpecialRequest = {
  _id?: string;
  name: string;
  description: string;
  image?: string;
  price:
    | {
        small?: number;
        medium?: number;
        large?: number;
      }
    | number;
};

export type MenuRequest = {
  _id?: string;
  name: string;
  items: ItemResponse[];
};
