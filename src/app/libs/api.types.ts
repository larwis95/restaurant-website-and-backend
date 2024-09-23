import { SaleSchema } from "@/models/types";

export type ErrorResponse = {
  error: string;
};

export type MenuResponse = {
  name: string;
  description: string;
  items: ItemResponse[];
};

export type ItemResponse = {
  _id: string;
  name: string;
  price: number;
  description: string;
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

export type SuccessResponse<T> = {
  message: string;
  data?: T;
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

export type ItemPostRequest = {
  name: string;
  price: number;
  description: string;
  category: string;
};
