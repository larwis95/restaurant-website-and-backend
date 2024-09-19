import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMutationForItem } from "@/app/libs/mutations/item/delete.item";
import { putMutationForItem } from "@/app/libs/mutations/item/put.item";
import { toast } from "@/hooks/use-toast";
import { IMenuItemProps } from "./Menu.interfaces";
import { ItemResponse } from "@/app/libs/api.types";

const MenuItem: React.FC<IMenuItemProps> = ({ item }) => {
  const { _id, name, description, price } = item;
  const [updatedItem, setUpdatedItem] = useState(item);
  const [isUpdating, setIsUpdating] = useState(false);

  const queryClient = useQueryClient();
  const deleteItem = useMutation({
    mutationFn: async () => {
      await deleteMutationForItem(_id);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${name} deleted successfully`,
      });
      queryClient.invalidateQueries({
        queryKey: ["fullMenu"],
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateItem = useMutation({
    mutationFn: async ({ _id, name, price, description }: ItemResponse) => {
      await putMutationForItem({ _id, name, price, description });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${name} updated successfully`,
      });
      queryClient.invalidateQueries({
        queryKey: ["fullMenu"],
      });
      setIsUpdating(false);
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
    updateItem.mutate(updatedItem);
  };

  return (
    <Card className="bg-slate-900 border border-border w-full sm:w-full md:w-1/2 lg:w-1/5 xl:w-1/5">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="flex flex-col justify-start">
          {!isUpdating && (
            <>
              <CardTitle
                className="w-fit text-2xl font-bold hover:cursor-pointer"
                onClick={() => setIsUpdating(true)}
              >
                {name}
              </CardTitle>
              <CardTitle
                className="w-fit hover:cursor-pointer"
                onClick={() => setIsUpdating(true)}
              >
                ${price.toPrecision(4)}
              </CardTitle>
            </>
          )}
          {isUpdating && (
            <>
              <input
                type="text"
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
                value={updatedItem.name}
                onChange={(e) =>
                  setUpdatedItem({ ...updatedItem, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                min={0}
                step={0.01}
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
                value={updatedItem.price}
                onChange={(e) =>
                  setUpdatedItem({
                    ...updatedItem,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </>
          )}
        </CardHeader>
        <CardContent className="flex flex-col justify-start">
          {!isUpdating && (
            <CardDescription
              className="w-fit hover:cursor-pointer text-left"
              onClick={() => setIsUpdating(true)}
            >
              {description}
            </CardDescription>
          )}
          {isUpdating && (
            <textarea
              className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600  h-32 w-full"
              value={updatedItem.description}
              onChange={(e) =>
                setUpdatedItem({ ...updatedItem, description: e.target.value })
              }
              required
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Button
            variant="outline"
            type="button"
            className="text-red-600 border border-red-600"
            onClick={() => deleteItem.mutate()}
          >
            Delete
          </Button>
          {isUpdating && (
            <Button
              variant="outline"
              type="submit"
              className="text-green-600 border border-green-600"
            >
              Save
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default MenuItem;
