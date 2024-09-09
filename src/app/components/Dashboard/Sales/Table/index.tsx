import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "../../Modal";
import {
  fetchSalesForCurrentWeek,
  fetchSalesForDay,
  fetchSalesForMonth,
  fetchSalesForWeek,
  fetchSalesForYear,
} from "@/app/libs/queries/sales/sales.get";
import { updateSale } from "@/app/libs/mutations/sales/put.sales";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDynamicSalesFetch } from "@/app/libs/hooks/useDynamicFetch";
import { format, getWeekOfMonth } from "date-fns";
import { SaleResponse, UpdateSaleFields } from "@/app/libs/api.types";
import { IFilterFormState, ISelectedSale } from "./Table.interfaces";
import { Button } from "@/components/ui/button";
import FilterForm from "./Table.FilterForm";

const SalesTable = () => {
  const queryClient = useQueryClient();
  const [dynamicFetch, setDynamicFetch] = useState<IFilterFormState>({
    type: "currentweek",
    args: {},
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
      queryClient.invalidateQueries({ queryKey: [dynamicFetch.type] });
    },
  });

  const [selectedSale, setSelectedSale] = useState<ISelectedSale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  if (error) {
    return <div>Error loading sales: {error.message}</div>;
  }

  return (
    <>
      <Modal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <Modal.Content>
          <Modal.Header>
            <h2 className="text-2xl">
              Sale for {format(selectedSale?.date ?? new Date(), "MM/dd/yyyy")}
            </h2>
            <Modal.Close />
          </Modal.Header>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleUpdateSale}
          >
            <label htmlFor="morning">Morning</label>
            <input
              type="number"
              value={selectedSale?.morning}
              onChange={(e) => {
                if (!selectedSale) return;
                setSelectedSale({
                  ...selectedSale,
                  morning: parseFloat(e.target.value),
                });
              }}
              className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            />
            <label htmlFor="night">Night</label>
            <input
              type="number"
              value={selectedSale?.night}
              onChange={(e) => {
                if (!selectedSale) return;
                setSelectedSale({
                  ...selectedSale,
                  night: parseFloat(e.target.value),
                });
              }}
              className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            />

            <label htmlFor="holiday">Holiday?</label>
            <input
              type="text"
              value={selectedSale?.holiday}
              onChange={(e) => {
                if (!selectedSale) return;
                setSelectedSale({
                  ...selectedSale,
                  holiday: e.target.value,
                });
              }}
              className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            />
            <Button type="submit">Update</Button>
          </form>
        </Modal.Content>
      </Modal>
      <FilterForm setFetch={setDynamicFetch} />
      <Button className="w-1/4">Add Sale</Button>
      <Table>
        <TableCaption className="text-green-600">
          Total: $
          {data
            ?.reduce((prev, curr) => {
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
          {data?.map((sale) => (
            <TableRow
              key={format(sale.date, "MM/dd/yyyy")}
              className="hover:cursor-pointer"
              onClick={() => {
                setSelectedSale({
                  date: sale.date,
                  morning: sale.morning,
                  night: sale.night,
                  holiday: sale.holiday,
                });
                setIsModalOpen(true);
              }}
            >
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
