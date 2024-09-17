import { useMutation } from "@tanstack/react-query";
import { IAddSaleFormProps } from "./Form.interfaces";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addSale } from "@/app/libs/mutations/sales/post.sales";
import { useQueryClient } from "@tanstack/react-query";
import { SaleRequest } from "@/app/libs/api.types";
import { useState } from "react";

const Add: React.FC<IAddSaleFormProps> = ({ type, setModalOpen }) => {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    date: new Date(),
    morning: 0,
    night: 0,
    holiday: "",
  });

  const postSale = useMutation({
    mutationFn: async ({ date, morning, night, holiday }: SaleRequest) => {
      await addSale({ date, morning, night, holiday });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: "Sale added successfully",
      });
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
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postSale.mutate({
      date: formState.date,
      morning: formState.morning,
      night: formState.night,
      holiday: formState.holiday,
    });
  };
  return (
    <form
      className={"flex flex-col items-center justify-center h-fit gap-2"}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.date.toISOString().split("T")[0]}
        onChange={(e) =>
          setFormState({ ...formState, date: new Date(e.target.value) })
        }
        required
      />
      <label htmlFor="morning">Morning</label>
      <input
        type="number"
        id="morning"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        min={0}
        value={formState.morning}
        onChange={(e) =>
          setFormState({ ...formState, morning: parseInt(e.target.value) })
        }
        required
      />
      <label htmlFor="night">Night</label>
      <input
        type="number"
        id="night"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        min={0}
        value={formState.night}
        onChange={(e) =>
          setFormState({ ...formState, night: parseInt(e.target.value) })
        }
        required
      />
      <label htmlFor="holiday">Holiday?</label>
      <input
        id="holiday"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.holiday}
      />

      <Button className="w-fit p-4" variant="outline">
        Add Sale
      </Button>
    </form>
  );
};

export default Add;
