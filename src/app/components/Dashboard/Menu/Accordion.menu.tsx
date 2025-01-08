import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { putMutationForItem } from "@/lib/mutations/item/put.item";
import { putMutatiuonForMenu } from "@/lib/mutations/menu/put.menu";
import { deleteMutationForItem } from "@/lib/mutations/item/delete.item";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMenus } from "@/lib/queries/menu/get.menu";
import { LoadingSpinner } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Sortable from "./Sortable.menu";
import { Form } from "../Form";

const MenuAccordion: React.FC = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["fullMenu"],
    queryFn: fetchAllMenus,
  });

  const [modalOpen, setModalOpen] = useState({
    addCategory: false,
    addItem: false,
  });

  const menuCategories = data && !("error" in data) ? data : [];

  return (
    <div className="w-full flex flex-col justify-start p-5 gap-2">
      {error && <div>Error: {error.message}</div>}
      {isPending && <LoadingSpinner className="text-secondary" />}
      {!menuCategories ||
        (menuCategories.length === 0 && (
          <div className="w-full flex flex-col justify-start p-5 gap-2">
            <p className="text-2xl font-bold w-fit">
              No menu categories found. Add one now!
            </p>
          </div>
        ))}
      <Dialog
        open={modalOpen.addCategory}
        onOpenChange={() =>
          setModalOpen({
            addCategory: !modalOpen.addCategory,
            addItem: false,
          })
        }
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit">
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Menu Category</DialogTitle>
            <DialogDescription>
              Add a new category to the menu.
            </DialogDescription>
          </DialogHeader>
          <Form.Root
            itemType="menu"
            mutationType="post"
            onClose={() =>
              setModalOpen({
                addCategory: !modalOpen.addCategory,
                addItem: false,
              })
            }
          >
            <Form.Input label="Name" type="text" value="" name="name" />
          </Form.Root>
        </DialogContent>
      </Dialog>
      <Accordion type="single" className="w-full" collapsible>
        {menuCategories.map((category) => (
          <div key={category.name}>
            <AccordionItem key={category.name} value={category.name}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <Separator />
              <AccordionContent className="flex flex-row flex-wrap  p-2 gap-4">
                <div className="w-full flex justify-end">
                  <Dialog
                    open={modalOpen.addItem}
                    onOpenChange={() =>
                      setModalOpen({
                        addCategory: false,
                        addItem: !modalOpen.addItem,
                      })
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-fit">
                        Add Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Menu Item</DialogTitle>
                        <DialogDescription>
                          Add a new item to {category.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <Form.Root
                        itemType="item"
                        mutationType="post"
                        onClose={() =>
                          setModalOpen({
                            addCategory: false,
                            addItem: !modalOpen.addItem,
                          })
                        }
                        category={category.name}
                      >
                        <Form.Input
                          label="Name"
                          type="text"
                          value=""
                          name="name"
                        />
                        <Form.PriceInput
                          label="Price"
                          value={0}
                          name="price"
                          type="number"
                        />
                        <Form.TextArea
                          label="Description"
                          type="text"
                          value=""
                          name="description"
                        />
                        <Form.ImageSelector />
                      </Form.Root>
                    </DialogContent>
                  </Dialog>
                </div>
                {category.items.length === 0 && (
                  <p className="w-fit">No items found in this category</p>
                )}
                <Sortable
                  category={category.name}
                  items={category.items}
                  mutation={putMutatiuonForMenu}
                  mutationMap={{
                    put: putMutationForItem,
                    del: deleteMutationForItem,
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default MenuAccordion;
