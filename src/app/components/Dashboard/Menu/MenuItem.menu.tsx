import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditableText from "../../Inputs/EditableInput";
import EditablePrice from "../../Inputs/EditablePrice";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { IMenuItemProps } from "./Menu.interfaces";
import { ItemResponse } from "@/lib/api.types";
import { fetchImages } from "@/lib/queries/images/get.images";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Price } from "../../Inputs/EditablePrice";

const MenuItem: React.FC<IMenuItemProps> = ({
  item,
  className,
  currentlyDragged,
  mutationMap,
}) => {
  const { _id, name, description, price, image } = item;
  const { put, del } = mutationMap;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [updatedItem, setUpdatedItem] = useState(item);
  const queryClient = useQueryClient();

  const deleteItem = useMutation({
    mutationFn: del,
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${name} deleted successfully`,
      });
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

  const updateItem = useMutation({
    mutationFn: async (updatedItem: ItemResponse) => {
      await put(updatedItem);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${name} updated successfully`,
      });
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

  const { data: images } = useSuspenseQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  const [selectedImage, setSelectedImage] = useState<number | undefined>(
    images?.data?.urls.indexOf(image)
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem.mutate(updatedItem);
  };

  const handleSave = (field: keyof ItemResponse, value: Price) => {
    if (value === undefined) return;
    setUpdatedItem((prev: ItemResponse) => ({ ...prev, [field]: value }));
  };

  return (
    <Card
      className={
        className ||
        `bg-slate-900 flex flex-col flex-grow border border-border w-full sm:w-full md:w-1/2 lg:w-1/5 xl:w-1/5 ${
          currentlyDragged && "opacity-0"
        } cursor-move`
      }
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      id={item._id}
    >
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="flex flex-col justify-start text-left">
          <CardTitle className="w-fit text-2xl font-bold">
            <EditableText
              initialValue={name}
              onSave={(value) => handleSave("name", value)}
            >
              {name}
            </EditableText>
          </CardTitle>
          <CardTitle className="w-full text-lg">
            <EditablePrice price={price} handleSave={handleSave} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-start gap-2 w-full text-left">
          <EditableText
            initialValue={description}
            onSave={(value) => handleSave("description", value)}
            textBox
          >
            {description}
          </EditableText>
          <ScrollArea className="w-full h-28 border border-border p-2">
            <div className="flex flex-row flex-wrap justify-start items-center gap-2">
              {images?.data?.urls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`image-${url}`}
                  width={80}
                  height={80}
                  className={`w-20 h-20 border border-border rounded-md hover:cursor-pointer transition duration-500 ${
                    selectedImage === index ? "border-green-600 border-2" : ""
                  }`}
                  onClick={() => {
                    setSelectedImage(index);
                    handleSave("image", url);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-row justify-between w-full">
          <Button
            variant="outline"
            type="button"
            disabled={deleteItem.isPending}
            className="text-red-600 border border-red-600"
            onClick={() => deleteItem.mutate(_id)}
          >
            {deleteItem.isPending ? "Deleting" : "Delete"}
          </Button>
          <Button
            variant="outline"
            type="submit"
            disabled={updateItem.isPending}
            className={`border ${
              updateItem.isPending
                ? "pointer-events-none text-red-600 border-red-600"
                : "border-green-600 text-green-600"
            } transition duration-500`}
          >
            {updateItem.isPending ? "Updating" : "Update"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MenuItem;
