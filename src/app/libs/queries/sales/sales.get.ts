import { SaleResponse } from "../../api.types";
import { QueryArgs } from "../../hooks/hooks.types";

export const fetchSalesForCurrentWeek = async (): Promise<SaleResponse[]> => {
  const response = await fetch(
    `http://localhost:3000/api/sales/week?current=true`
  );
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
    `http://localhost:3000/api/sales/week?year=${year}&month=${month}&week=${week}`
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
  const response = await fetch(
    `http://localhost:3000/api/sales/month?year=${year}&month=${month}`
  );
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForYear = async ({
  year,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(
    `http://localhost:3000/api/sales/year?year=${year}`
  );
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};

export const fetchSalesForDay = async ({
  day,
}: QueryArgs): Promise<SaleResponse[]> => {
  const response = await fetch(`http://localhost:3000/api/sales/${day}`);
  const data: SaleResponse[] = await response.json();
  if (!data) {
    throw new Error("Error fetching sales data.");
  }
  return data;
};
