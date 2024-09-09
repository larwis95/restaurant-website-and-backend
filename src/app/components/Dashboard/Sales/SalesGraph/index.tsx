"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSalesForCurrentWeek } from "@/app/libs/queries/sales/sales.get";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { chartConfig } from "./SalesGraph.config";
import { Button } from "@/components/ui/button";
import Modal from "../../Modal";
import { useState } from "react";
import { addSale } from "@/app/libs/mutations/sales/post.sales";
import { SaleRequest } from "@/app/libs/api.types";

const SalesGraph = () => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["currentweek"],
    queryFn: async () => {
      return await fetchSalesForCurrentWeek();
    },
  });

  const postSale = useMutation({
    mutationFn: async ({ date, morning, night, holiday }: SaleRequest) => {
      await addSale({ date, morning, night, holiday });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentweek"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const salesData = data?.map((sale) => ({
    date: format(new Date(sale.date), "MM/dd"),
    morning: sale.morning,
    night: sale.night,
  }));

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const date = form["date"].value;
    const morning = form["morning"].value;
    const night = form["night"].value;
    const holiday = form["holiday"].checked;

    postSale.mutate({
      date,
      morning,
      night,
      holiday,
    });
    setIsModalOpen(false);
  };

  if (error) {
    return <div>Error loading graph: {error.message}</div>;
  }

  if (data?.length === 0) {
    return (
      <>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <Modal.Content>
            <Modal.Header>
              <h2 className="text-2xl">Add Sale</h2>
              <Modal.Close />
            </Modal.Header>
            <form
              className={"flex flex-col items-center justify-center h-fit"}
              onSubmit={handleFormSubmit}
            >
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
                value={new Date().toISOString().split("T")[0]}
                required
              />
              <label htmlFor="morning">Morning</label>
              <input
                type="number"
                id="morning"
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
                min={0}
                required
              />
              <label htmlFor="night">Night</label>
              <input
                type="number"
                id="night"
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
                min={0}
                required
              />
              <label htmlFor="holiday">Holiday?</label>
              <input
                id="holiday"
                className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
              />

              <Button className="w-fit p-4">Add Sale</Button>
            </form>
          </Modal.Content>
        </Modal>
        <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
          <div>No sales data found for the current week, add a sale!</div>
          <Button
            className="w-1/4"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Sale
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
      {isPending && (
        <>
          <Skeleton className="w-full h-96 bg-background border border-white" />
        </>
      )}
      <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
        <BarChart accessibilityLayer data={salesData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            dataKey="night"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="morning" fill={chartConfig.morning.color} radius={4} />
          <Bar dataKey="night" fill={chartConfig.night.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default SalesGraph;
