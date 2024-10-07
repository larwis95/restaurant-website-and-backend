import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IAddCategoryFormProps,
  IAddItemFormProps,
  IAddSaleFormProps,
  IAddSpecialFormProps,
  IBulkAddSalesInputProps,
} from "./Form.interfaces";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addSale } from "@/lib/mutations/sales/post.sales";
import { useQueryClient } from "@tanstack/react-query";
import { ItemPostRequest, SaleRequest, SpecialRequest } from "@/lib/api.types";
import { useState } from "react";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { postMutationForMenu } from "@/lib/mutations/menu/post.menu";
import { postMutationForItem } from "@/lib/mutations/item/post.item";
import postSpecial from "@/lib/mutations/specials/specials.post";
import { fetchImages } from "@/lib/queries/images/get.images";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading";

export const AddSaleForm: React.FC<IAddSaleFormProps> = ({
  type,
  setModalOpen,
}) => {
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
        description: `Sale added successfully for ${format(new UTCDate(formState.date), "MMMM do, yyyy")}`,
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
      className={"flex flex-col items-start justify-start h-fit gap-2"}
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
        onChange={(e) =>
          setFormState({ ...formState, night: parseInt(e.target.value) })
        }
        required
      />
      <label htmlFor="holiday">Holiday?</label>
      <input
        id="holiday"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        onChange={(e) =>
          setFormState({ ...formState, holiday: e.target.value })
        }
      />

      <Button className="w-fit p-4" variant="outline">
        Add Sale
      </Button>
    </form>
  );
};

export const AddMenuCategoryForm: React.FC<IAddCategoryFormProps> = ({
  setModalOpen,
}) => {
  const queryClient = useQueryClient();
  const postMenu = useMutation({
    mutationFn: async (name: string) => {
      await postMutationForMenu(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fullMenu"],
      });
      toast({
        title: "Success",
        description: "Menu category added successfully.",
      });
      setModalOpen({ addCategory: false, addItem: false });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [name, setName] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    postMenu.mutate(name);
  };

  return (
    <form
      className={"flex flex-col items-start justify-start h-fit gap-2"}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button className="w-fit p-4" variant="outline">
        Add Category
      </Button>
    </form>
  );
};

export const AddItemForm: React.FC<IAddItemFormProps> = ({
  category,
  setModalOpen,
}) => {
  const queryClient = useQueryClient();
  const postItem = useMutation({
    mutationFn: async (item: ItemPostRequest) => {
      await postMutationForItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: `${formState.name} added successfully to ${category}`,
      });
      setModalOpen({ addCategory: false, addItem: false });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const {
    isPending,
    error,
    data: images,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const [formState, setFormState] = useState({
    name: "",
    price: 0,
    description: "",
    category,
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.price || !formState.description) return;
    postItem.mutate(formState);
  };

  return (
    <form
      className={"flex flex-col items-start justify-start h-fit gap-2"}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.name}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        required
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.price}
        min={0}
        step={0.01}
        onChange={(e) =>
          setFormState({ ...formState, price: parseFloat(e.target.value) })
        }
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.description}
        onChange={(e) =>
          setFormState({ ...formState, description: e.target.value })
        }
        required
      />
      <ScrollArea>
        <div className="flex flex-row flex-wrap gap-2">
          {isPending && <LoadingSpinner className="text-secondary" />}
          {error && <p>Error: {error.message}</p>}
          {images &&
            images.data &&
            images.data.urls.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={image}
                width={80}
                height={80}
                className={`cursor-pointer ${selectedImage === index ? "border border-green-600 pointer-events-none cursor-auto" : "hover:scale-105 hover:border-secondary border border-border transition-all duration-500"}`}
                onClick={() => {
                  setFormState({ ...formState, image: image });
                  setSelectedImage(index);
                }}
              />
            ))}
        </div>
      </ScrollArea>
      <Button className="w-fit p-4" variant="outline">
        Add Item
      </Button>
    </form>
  );
};

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

export const AddSpecialForm: React.FC<IAddSpecialFormProps> = ({
  setModalOpen,
}) => {
  const queryClient = useQueryClient();
  const postSpecialMutation = useMutation({
    mutationFn: async (special: SpecialRequest) => {
      await postSpecial(special);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: "Special added successfully.",
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

  const {
    isPending,
    error,
    data: images,
  } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name || !formState.description || !formState.price) return;
    postSpecialMutation.mutate(formState);
  };

  return (
    <form
      className={"flex flex-col items-start justify-start h-fit gap-2"}
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.name}
        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.description}
        onChange={(e) =>
          setFormState({ ...formState, description: e.target.value })
        }
        required
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        value={formState.price}
        min={0}
        step={0.01}
        onChange={(e) =>
          setFormState({ ...formState, price: parseFloat(e.target.value) })
        }
        required
      />
      <ScrollArea>
        <div className="flex flex-row flex-wrap gap-2">
          {isPending && <LoadingSpinner className="text-secondary" />}
          {error && <p>Error: {error.message}</p>}
          {images &&
            images.data &&
            images.data.urls.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={image}
                width={80}
                height={80}
                className={`cursor-pointer ${selectedImage === index ? "border border-green-600 pointer-events-none cursor-auto" : "hover:scale-105 hover:border-secondary border border-border transition-all duration-500"}`}
                onClick={() => {
                  setFormState({ ...formState, image: image });
                  setSelectedImage(index);
                }}
              />
            ))}
        </div>
      </ScrollArea>
      <Button className="w-fit p-4" variant="outline">
        Add Special
      </Button>
    </form>
  );
};
