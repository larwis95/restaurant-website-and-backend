"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSalesForWeek } from "@/app/libs/queries/sales/sales.get";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { format, getWeekOfMonth } from "date-fns";
import { chartConfig } from "./SalesGraph.config";
import { Button } from "@/components/ui/button";
import { AddSaleForm } from "../../Form";

const SalesGraph = () => {
  const [addOpen, setAddOpen] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["currentweek"],
    queryFn: async () => {
      return await fetchSalesForWeek({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        week: getWeekOfMonth(new Date()),
      });
    },
  });

  const salesData = data?.map((sale) => ({
    date: format(new Date(sale.date), "MM/dd"),
    morning: sale.morning,
    night: sale.night,
  }));

  if (error) {
    return <div>Error loading graph: {error.message}</div>;
  }

  if (data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
        <div>No sales data found for the current week, add a sale!</div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
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
            <AddSaleForm setModalOpen={setAddOpen} />
          </DialogContent>
        </Dialog>
      </div>
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
