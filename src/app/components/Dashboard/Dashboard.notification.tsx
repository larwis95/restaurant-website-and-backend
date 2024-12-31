import { useQuery } from "@tanstack/react-query";
import { fetchMissingSalesDates } from "@/lib/queries/sales/sales.get";
import Bell from "../Bell";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BulkAddSales from "./ModalContent/BulkAddSales";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const DashBoardNotification = () => {
  const { data } = useQuery({
    queryKey: ["missingSales"],
    queryFn: fetchMissingSalesDates,
    refetchOnMount: true,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const missingSales = data?.data?.[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex flex-col w-10 h-10 items-center justify-center p-2 rounded-full border border-border bg-priary hover:bg-white hover:fill-primary transition duration-500 hover:cursor-pointer">
          {missingSales && missingSales.dates.length > 0 ? (
            <div className="absolute -top-3 -right-3 w-4 h-4 p-3 bg-red-500 rounded-full flex items-center text-center justify-center">
              <span className="text-xs text-center">
                {missingSales.dates.length > 9
                  ? "9+"
                  : missingSales.dates.length}
              </span>
            </div>
          ) : null}
          <Bell
            color="white"
            width={40}
            height={40}
            className="hover:fill-primary transition duration-500"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex justify-start">
        {missingSales && missingSales.dates.length > 0 ? (
          <ScrollArea className="w-fit h-80 flex flex-col justify-start">
            <div className="flex flex-col gap-2  w-full justify-start">
              <h2 className="text-lg font-bold text-center text-white">
                Missing Sales
              </h2>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger>
                  <Button variant="outline">Add Missing Sales</Button>
                </DialogTrigger>
                <BulkAddSales setModalOpen={setModalOpen} />
              </Dialog>
              {missingSales.dates.map((date, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-start w-fit border-b"
                >
                  <p className="text-white w-fit">
                    {format(new UTCDate(date), "MMMM do, yyyy")}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col gap-2 p-2">
            <h2 className="text-lg font-bold text-center text-white">
              No Missing Sales
            </h2>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DashBoardNotification;
