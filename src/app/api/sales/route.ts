import { getSales } from "@/app/libs/controllers/sales/get";
import { NextApiRequest, NextApiResponse } from "next";
import { SalesResponse } from "@/app/libs/types";

const getSalesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<SalesResponse>
) => {
  const sales = await getSales();
  return new Response(JSON.stringify(sales), { status: 200 });
};

export { getSalesHandler as GET };
