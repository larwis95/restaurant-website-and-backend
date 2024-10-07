import { Button } from "@/components/ui/button";
import { IUpdateSaleFormProps } from "./Form.interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSaleByDate } from "@/lib/mutations/sales/delete.sales";
import { toast } from "@/hooks/use-toast";

const Update: React.FC<IUpdateSaleFormProps> = ({
  handleUpdateSale,
  setSelectedSale,
  selectedSale,
  setModalOpen,
}) => {
  const queryClient = useQueryClient();
  const deleteSale = useMutation({
    mutationFn: async (date: Date) => {
      await deleteSaleByDate(date);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `Sale for: ${selectedSale?.date} deleted successfully`,
      });
      setSelectedSale(null);
      setModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteSale = () => {
    if (!selectedSale) return;
    deleteSale.mutate(selectedSale.date);
  };

  return (
    <form
      className="flex flex-col items-start justify-start h-fit gap-2"
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
      <div className="flex flex-row gap-2">
        <Button type="submit" variant="outline">
          Update
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-red-600 text-red-600"
          onClick={handleDeleteSale}
        >
          Delete Sale
        </Button>
      </div>
    </form>
  );
};

export default Update;
