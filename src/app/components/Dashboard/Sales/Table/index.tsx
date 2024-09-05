import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  findSaleByDay,
  findSalesByWeek,
  findSalesByYear,
  findSalesByMonth,
} from "@/app/libs/controllers/sales/findSale";
import { useState, useEffect } from "react";
import { getWeekOfMonth, format } from "date-fns";
import { FindSaleArgs, SaleResponse } from "@/app/libs/api.types";
import { IFindSaleServerAction } from "@/app/libs/api.interfaces";
import FilterForm from "./Table.FilterForm";

const SalesTable = () => {
  const salesStore: {
    [key: string]: IFindSaleServerAction;
  } = {
    year: findSalesByYear,
    month: findSalesByMonth,
    week: findSalesByWeek,
    day: findSaleByDay,
  };

  const today = new Date();
  const [sales, setSales] = useState<SaleResponse[] | null>(null);
  const [error, setError] = useState("");

  const handleFetchSales = async (type: string, findSaleArgs: FindSaleArgs) => {
    console.log(findSaleArgs);
    const sales = await salesStore[type](findSaleArgs);
    if (!Array.isArray(sales)) {
      setError(sales.error);
      return;
    }
    setSales(sales);
  };

  useEffect(() => {
    if (!sales) {
      handleFetchSales("month", {
        year: 2023,
        month: today.getMonth() + 1,
        week: getWeekOfMonth(today, { weekStartsOn: 1 }),
      });
    }
  });

  if (error) {
    return <div>Error loading sales: {error}</div>;
  }

  return (
    <>
      <FilterForm onSubmit={setSales} actionStore={salesStore} />
      <Table>
        <TableCaption className="text-green-600">
          Total: $
          {sales
            ?.reduce((prev, curr, i) => {
              return prev + (curr.morning || 0) + (curr.night || 0);
            }, 0)
            .toFixed(2)}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Morning</TableHead>
            <TableHead className="text-center">Night</TableHead>
            <TableHead className="text-center">Holiday?</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales?.map((sale) => (
            <TableRow key={sale._id}>
              <TableCell>{format(sale.date, "MM/dd/yyyy")}</TableCell>
              <TableCell>{sale.morning.toFixed(2)}</TableCell>
              <TableCell>{sale.night.toFixed(2)}</TableCell>
              <TableCell>{sale.holiday || "No"}</TableCell>
              <TableCell>{(sale.morning + sale.night).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SalesTable;
