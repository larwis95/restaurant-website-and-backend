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
  name: string;
  price: number;
  description: string;
};

export type SaleResponse = {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
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
