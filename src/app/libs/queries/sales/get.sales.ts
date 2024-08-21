import { SalesResponse } from "../../api.types";

const fetchSales = async (): Promise<SalesResponse> => {
  const response: SalesResponse = await fetch(
    "http://localhost:3000/api/sales"
  ).then((res) => res.json());
  return response;
};

export { fetchSales };
