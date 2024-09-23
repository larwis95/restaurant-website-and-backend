import { get } from "http";
import { MissingDate, SaleResponse, SuccessResponse } from "../../api.types";
import { QueryArgs } from "../../hooks/hooks.types";
import getErrorMessage from "@/lib/getErrorMessage";

export const fetchSalesForCurrentWeek = async (): Promise<SaleResponse[]> => {
  const response = await fetch(`/api/sales/week`);
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForWeek = async ({
  year,
  month,
  week,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(
    `/api/sales/week?year=${year}&month=${month}&week=${week}`
  );
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForMonth = async ({
  year,
  month,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(`/api/sales/month?year=${year}&month=${month}`);
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForYear = async ({
  year,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(`/api/sales/year?year=${year}`);
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForDay = async ({
  day,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(`/api/sales/${day}`);

  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchMissingSalesDates = async (): Promise<
  SuccessResponse<MissingDate[]>
> => {
  try {
    const response = await fetch(`/api/sales/missing`);
    const data: SuccessResponse<MissingDate[]> = await response.json();
    if (!data) {
      throw new Error("Error fetching missing sales dates.");
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
