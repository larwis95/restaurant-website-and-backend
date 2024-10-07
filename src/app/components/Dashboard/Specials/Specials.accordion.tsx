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
import { LoadingSpinner } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSpecials } from "@/lib/queries/specials/get.specials";
import { useState } from "react";
import { AddSpecialForm } from "../Form/Add";

const SpecialAccordion = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["specials"],
    queryFn: getSpecials,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const specials = data || [];

  return (
    <div className="w-full flex flex-col justify-start p-5 gap-2">
      {error && <div>Error: {error.message}</div>}
      {isLoading && <LoadingSpinner className="text-secondary" />}
      {!specials ||
        (specials.length === 0 && (
          <div className="w-full flex flex-col justify-start p-5 gap-2">
            <p className="text-2xl font-bold w-fit">
              No specials found. Add one now!
            </p>
          </div>
        ))}
      <div className="w-full flex flex-row justify-start items-end gap-2">
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
      </div>
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem key="specials" value="specials">
          <AccordionTrigger>Specials</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap  p-2 gap-4">
            {specials.map((special) => (
              <div
                key={special._id}
                className="w-full flex flex-row flex-wrap gap-2"
              >
                <div className="w-full flex flex-row justify-between items-center">
                  <p className="text-xl">{special.name}</p>
                  <p className="text-xl">{special.price}</p>
                </div>
                <p className="text-md">{special.description}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SpecialAccordion;
