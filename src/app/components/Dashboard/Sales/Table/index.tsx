import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  fetchSalesForCurrentWeek,
  fetchSalesForDay,
  fetchSalesForMonth,
  fetchSalesForWeek,
  fetchSalesForYear,
} from "@/lib/queries/sales/sales.get";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useMemo, useCallback } from "react";
import { useDynamicSalesFetch } from "@/lib/hooks/useDynamicFetch";
import { format, getWeekOfMonth } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { SaleResponse, UpdateSaleFields } from "@/lib/api.types";
import { IFilterFormState } from "./Table.interfaces";
import { Button } from "@/components/ui/button";
import { Form } from "../../Form";
import FilterForm from "./Table.FilterForm";
import { DialogDescription } from "@radix-ui/react-dialog";

const SalesTable = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [dynamicFetch, setDynamicFetch] = useState<IFilterFormState>({
    type: "week",
    args: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: getWeekOfMonth(new Date()),
    },
  });

  const [selectedSale, setSelectedSale] = useState<SaleResponse | null>(null);

  const { isPending, error, data } = useDynamicSalesFetch(
    {
      currentweek: fetchSalesForCurrentWeek,
      week: fetchSalesForWeek,
      month: fetchSalesForMonth,
      year: fetchSalesForYear,
      day: fetchSalesForDay,
    },
    dynamicFetch.type,
    dynamicFetch.args
  );

  const totalSales = useMemo(() => {
    if (!Array.isArray(data)) return 0;
    return data
      .reduce((prev, curr) => prev + (curr.morning || 0) + (curr.night || 0), 0)
      .toFixed(2);
  }, [data]);

  const handleRowClick = useCallback((sale: SaleResponse) => {
    setSelectedSale(sale);
    setUpdateOpen(true);
  }, []);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-5 items-end">
        <FilterForm setFetch={setDynamicFetch} />
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-fit" variant="outline">
              Add Sale
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Sale</DialogTitle>
              <DialogDescription>
                Fill out the form to add a sale.
              </DialogDescription>
            </DialogHeader>
            <Form.Root
              itemType="sale"
              mutationType="post"
              onClose={() => setAddOpen(false)}
            >
              <Form.DatePicker
                label="Date"
                type="date"
                value={format(new UTCDate(), "yyyy-MM-dd")}
                name="date"
                allowPicker
              />
              <Form.Input
                label="Morning"
                type="number"
                value={0}
                name="morning"
              />
              <Form.Input label="Night" type="number" value={0} name="night" />
              <Form.Input
                label="Holiday?"
                type="text"
                value=""
                name="holiday"
              />
            </Form.Root>
          </DialogContent>
        </Dialog>
        <h2>Sales Total: ${totalSales}</h2>
      </div>
      {isPending && (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner className="text-secondary" />
        </div>
      )}
      {error && (
        <div className="w-full flex items-center justify-center text-red-500">
          Error loading sales data.
        </div>
      )}
      <Table className="h-fit">
        <TableCaption className="text-green-600">
          Click on a row to update the sale.
        </TableCaption>
        <TableHeader>
          <TableRow className="h-6">
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Morning</TableHead>
            <TableHead className="text-center">Night</TableHead>
            <TableHead className="text-center">Holiday?</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((sale) => (
                <DialogTrigger key={sale._id} asChild>
                  <TableRow
                    className="hover:cursor-pointer h-6"
                    onClick={() => handleRowClick(sale)}
                  >
                    <TableCell>
                      {format(new UTCDate(sale.date), "MM/dd/yyyy")}
                    </TableCell>
                    <TableCell>
                      {sale.morning ? sale.morning.toFixed(2) : 0}
                    </TableCell>
                    <TableCell>{sale.night.toFixed(2)}</TableCell>
                    <TableCell>{sale.holiday || "No"}</TableCell>
                    <TableCell>
                      {(sale.morning + sale.night).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No sales found for the selected period.
                </TableCell>
              </TableRow>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Update Sale:{" "}
                  {selectedSale &&
                    format(new UTCDate(selectedSale.date), "MM/dd/yyyy")}
                </DialogTitle>
                <DialogDescription>
                  Fill out the form to update the sale.
                </DialogDescription>
              </DialogHeader>
              {selectedSale && (
                <Form.Root
                  itemType="sale"
                  mutationType="put"
                  item={selectedSale}
                  onClose={() => {
                    setSelectedSale(null);
                    setUpdateOpen(false);
                  }}
                >
                  <Form.DatePicker
                    label="Date"
                    type="date"
                    value={format(new UTCDate(selectedSale.date), "yyyy-MM-dd")}
                    name="date"
                  />
                  <Form.Input
                    label="Morning"
                    type="number"
                    value={selectedSale.morning}
                    name="morning"
                  />
                  <Form.Input
                    label="Night"
                    type="number"
                    value={selectedSale.night}
                    name="night"
                  />
                  <Form.Input
                    label="Holiday?"
                    type="text"
                    value={selectedSale.holiday || ""}
                    name="holiday"
                  />
                </Form.Root>
              )}
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </>
  );
};

export default SalesTable;
