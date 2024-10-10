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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoadingSpinner } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  getSpecials,
  getActiveSpecials,
} from "@/lib/queries/specials/get.specials";
import putSpecial from "@/lib/mutations/specials/specials.put";
import deleteSpecial from "@/lib/mutations/specials/specials.delete";
import { putActiveSpecial } from "@/lib/mutations/specials/specials.put";
import { useState } from "react";
import { AddSpecialForm } from "../Form/Add";
import Sortable from "../Menu/Sortable.menu";
import { SpecialsCheckBox } from "./Specials.checkbox";

const SpecialAccordion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["specials"],
    queryFn: getSpecials,
  });

  const { data: activeSpecials = [], isLoading: loadingActiveSpecials } =
    useQuery({
      queryKey: ["activeSpecials"],
      queryFn: getActiveSpecials,
    });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col justify-start p-5 gap-2">
      {error && <div>Error: {error.message}</div>}
      {isLoading && <LoadingSpinner className="text-secondary" />}
      <div className="w-full flex flex-row justify-end items-end gap-2">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-fit">
              Add Special
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Special</DialogTitle>
              <DialogDescription>Add a special to the menu.</DialogDescription>
            </DialogHeader>
            <AddSpecialForm setModalOpen={setModalOpen} />
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-fit">
              View Active
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            {loadingActiveSpecials && (
              <LoadingSpinner className="text-secondary" />
            )}
            {data?.length === 0 && <p>No specials found, add one</p>}
            {data && data.length > 0 && (
              <SpecialsCheckBox
                specials={data}
                activeSpecials={activeSpecials}
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem key="specials" value="specials">
          <AccordionTrigger>Specials</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap  p-2 gap-4">
            {activeSpecials?.length > 0 && (
              <Sortable
                items={activeSpecials}
                mutationMap={{
                  put: putSpecial,
                  del: deleteSpecial,
                }}
                mutation={putActiveSpecial}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SpecialAccordion;
