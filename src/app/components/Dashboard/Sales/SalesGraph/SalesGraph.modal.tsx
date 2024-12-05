import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddSaleForm } from "../../Form";
import { Dispatch, SetStateAction } from "react";

interface ISalesModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SalesModal: React.FC<ISalesModalProps> = ({ open, setOpen }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
      <div>No sales data found for the current week, add a sale!</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <span>Add Sale</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sale</DialogTitle>
            <DialogDescription>
              Fill out the form to add a sale.
            </DialogDescription>
          </DialogHeader>
          <AddSaleForm setModalOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesModal;
