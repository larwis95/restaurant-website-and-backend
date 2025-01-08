import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { bulkAddSales } from "@/lib/mutations/sales/post.sales";
import { fetchMissingSalesDates } from "@/lib/queries/sales/sales.get";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UTCDate } from "@date-fns/utc";
import { SaleRequest } from "@/lib/api.types";
import { Separator } from "@/components/ui/separator";

interface BulkAddSalesProps {
  setModalOpen: (boolean: boolean) => void;
}

export interface IBulkAddSalesInputProps {
  date: string;
  handleChange: (
    index: number,
    key: keyof SaleRequest,
    value: string | number
  ) => void;
  handleRemoveSale: (index: number) => void;
  index: number;
}

export const BulkSaleInputs: React.FC<IBulkAddSalesInputProps> = ({
  date,
  handleChange,
  handleRemoveSale,
  index,
}) => {
  return (
    <div className="flex flex-col w-full justify-center gap-3 p-2">
      <div className="flex flex-row w-full justify-end">
        <Button
          className="w-fit p-2"
          variant="outline"
          type="button"
          onClick={() => handleRemoveSale(index)}
        >
          X
        </Button>
      </div>
      <label htmlFor={`${date}${index}`}>Date</label>
      <input
        type="date"
        id={`${date}${index}`}
        className="border border-border rounded-md p-2 bg-primary text-white cursor-not-allowed w-fit"
        value={date}
        disabled
        readOnly
      />
      <label htmlFor="morning">Morning</label>
      <input
        type="number"
        id="morning"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        min={0}
        onChange={(e) =>
          handleChange(index, "morning", parseInt(e.target.value))
        }
        required
      />
      <label htmlFor={`night${index}`}>Night</label>
      <input
        type="number"
        id={`night${index}`}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        min={0}
        onChange={(e) => handleChange(index, "night", parseInt(e.target.value))}
        required
      />
      <label htmlFor={`holiday${index}`}>Holiday?</label>
      <input
        id={`holiday${index}`}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        onChange={(e) => handleChange(index, "holiday", e.target.value)}
      />
      <Separator />
    </div>
  );
};

const BulkAddSales = ({ setModalOpen }: BulkAddSalesProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["missingSales"],
    queryFn: fetchMissingSalesDates,
  });
  const missingSales = data?.data?.[0];
  const [sales, setSales] = useState<SaleRequest[]>([]);
  const bulkAddSalesMutation = useMutation({
    mutationFn: async (sales: SaleRequest[]) => {
      await bulkAddSales(sales);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Sales added successfully`,
      });
      setModalOpen(false);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (missingSales) {
      setSales(
        missingSales.dates.map((date) => {
          return {
            date,
            morning: 0,
            night: 0,
            holiday: "",
          };
        })
      );
    }
  }, [missingSales]);

  useEffect(() => {
    if (sales.length === 0) {
      setModalOpen(false);
    }
  }, [sales, setModalOpen]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    bulkAddSalesMutation.mutate(sales);
  };

  const handleRemoveSale = (index: number) => {
    setSales(sales.filter((_, i) => i !== index));
  };

  const handleSaleChange = (
    index: number,
    key: keyof SaleRequest,
    value: string | number
  ) => {
    setSales(
      sales.map((sale, i) => {
        if (i === index) {
          return {
            ...sale,
            [key]: value,
          };
        }
        return sale;
      })
    );
  };

  return (
    <DialogContent>
      <DialogHeader className="flex flex-col justify-start">
        <DialogTitle>Add Missing Sales</DialogTitle>
        <DialogDescription>
          Use the multi-form below to add missing sales for dates.
        </DialogDescription>
      </DialogHeader>
      {missingSales?.dates.length === 0 && (
        <p className="text-center text-lg">No missing sales</p>
      )}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-full items-center justify-center"
      >
        <ScrollArea className="w-full h-80 flex flex-row  gap-5">
          {sales.map((sale, index) => (
            <BulkSaleInputs
              key={index}
              index={index}
              date={format(new UTCDate(sale.date), "yyyy-MM-dd")}
              handleChange={handleSaleChange}
              handleRemoveSale={handleRemoveSale}
            />
          ))}
        </ScrollArea>
        <Button
          type="submit"
          disabled={bulkAddSalesMutation.isPending}
          className="w-full"
        >
          {bulkAddSalesMutation.isPending ? "Adding Sales..." : "Add Sales"}
        </Button>
      </form>
    </DialogContent>
  );
};

export default BulkAddSales;
