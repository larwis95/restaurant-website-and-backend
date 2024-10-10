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
import { AddItemForm, AddMenuCategoryForm } from "../Form";
import { putMutationForItem } from "@/lib/mutations/item/put.item";
import { deleteMutationForItem } from "@/lib/mutations/item/delete.item";
import { putMutatiuonForMenu } from "@/lib/mutations/menu/put.menu";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMenus } from "@/lib/queries/menu/get.menu";
import { LoadingSpinner } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Sortable from "./Sortable.menu";

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
          <AddMenuCategoryForm setModalOpen={setModalOpen} />
        </DialogContent>
      </Dialog>
      <Accordion type="single" className="w-full" collapsible>
        {menuCategories.map((category, index) => (
          <>
            <AccordionItem key={index} value={category.name}>
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
                      <AddItemForm
                        category={category.name}
                        setModalOpen={setModalOpen}
                      />
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
          </>
        ))}
      </Accordion>
    </div>
  );
};

export default MenuAccordion;
