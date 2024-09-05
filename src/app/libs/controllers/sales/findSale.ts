"use server";
import { Sale } from "@/models";
import { getWeekOfMonth } from "date-fns";
import { IFindSaleServerAction } from "../../api.interfaces";

export const findSalesByYear: IFindSaleServerAction = async ({ year }) => {
  if (typeof year === "undefined") {
    return { error: "Year is required" };
  }
  return await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-31-12`),
      },
    },
    "-__v"
  );
};

export const findSalesByMonth: IFindSaleServerAction = async ({
  year,
  month,
}) => {
  return await Sale.find(
    {
      date: {
        $gte: new Date(`${year}-${month}-01`),
        $lt: new Date(`${year}-${month}-31`),
      },
    },
    "-__v"
  );
};

export const findSalesByWeek: IFindSaleServerAction = async ({
  year,
  month,
  week,
}) => {
  const monthSales = await findSalesByMonth({ year, month });
  if (!Array.isArray(monthSales) || monthSales.length === 0) {
    return { error: "No sales found for this week" };
  }

  const weekSales = monthSales.filter((sale) => {
    const saleWeek = getWeekOfMonth(new Date(sale.date), { weekStartsOn: 1 });
    return saleWeek === week;
  });
  return weekSales;
};

export const findSaleByDay: IFindSaleServerAction = async ({ day }) => {
  if (typeof day === "undefined") {
    return { error: "Day is required" };
  }
  const sale = await Sale.findOne(
    {
      date: {
        $gte: new Date(day),
        $lt: new Date(day).setDate(new Date(day).getDate() + 1),
      },
    },
    "-__v"
  );
  console.log(sale);
  if (!sale) {
    return { error: "No sales found for this day" };
  }
  return [sale];
};
