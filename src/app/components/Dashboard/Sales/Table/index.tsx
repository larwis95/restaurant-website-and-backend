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
import { AddSaleForm, UpdateSaleForm } from "../../Form";
import { useToast } from "@/hooks/use-toast";
import { updateSale } from "@/lib/mutations/sales/put.sales";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDynamicSalesFetch } from "@/lib/hooks/useDynamicFetch";
import { format, getWeekOfMonth } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { UpdateSaleFields } from "@/lib/api.types";
import { IFilterFormState, ISelectedSale } from "./Table.interfaces";
import { Button } from "@/components/ui/button";
import FilterForm from "./Table.FilterForm";
import { DialogDescription } from "@radix-ui/react-dialog";

const SalesTable = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
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

  const putSale = useMutation({
    mutationFn: async ({
      date,
      fields,
    }: {
      date: Date;
      fields: UpdateSaleFields;
    }) => {
      await updateSale({ date, fields });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `Sale for: ${format(selectedSale?.date ?? new Date(), "MM/dd/yyyy")} updated successfully`,
      });
      setSelectedSale(null);
      setUpdateOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [selectedSale, setSelectedSale] = useState<ISelectedSale | null>(null);

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

  const handleUpdateSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSale) return;
    putSale.mutate({
      date: selectedSale.date,
      fields: {
        morning: selectedSale.morning,
        night: selectedSale.night,
        holiday: selectedSale.holiday,
      },
    });
  };

  console.log("table data", data);

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
            <AddSaleForm type={dynamicFetch.type} setModalOpen={setAddOpen} />
          </DialogContent>
        </Dialog>
        <h2>
          Sales Total: $
          {(Array.isArray(data) &&
            data
              ?.reduce((prev, curr) => {
                return prev + (curr.morning || 0) + (curr.night || 0);
              }, 0)
              .toFixed(2)) ||
            0}
        </h2>
      </div>
      {isPending && (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner className="text-secondary" />
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
            {(Array.isArray(data) &&
              data?.map((sale) => (
                <DialogTrigger key={sale._id} asChild>
                  <TableRow
                    className="hover:cursor-pointer h-6"
                    onClick={() => {
                      setSelectedSale(sale);
                    }}
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
              ))) || (
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
              <UpdateSaleForm
                handleUpdateSale={handleUpdateSale}
                selectedSale={selectedSale}
                setSelectedSale={setSelectedSale}
                setModalOpen={setUpdateOpen}
              />
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </>
  );
};

export default SalesTable;
