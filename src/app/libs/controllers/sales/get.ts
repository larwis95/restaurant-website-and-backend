import { SalesResponse } from "../../api.types";

const TestSalesResponse: SalesResponse = {
  date: "2021-01-01",
  morningSales: 1000,
  nightSales: 2000,
  totalSales: 3000,
};

const getSales = async (): Promise<SalesResponse> => {
  return TestSalesResponse;
};

const getSale = async (date: string): Promise<SalesResponse> => {
  return TestSalesResponse;
};

export { getSales, getSale };
