"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchSalesForCurrentWeek } from "@/app/libs/queries/sales/sales.get";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { chartConfig } from "./SalesGraph.config";

const SalesGraph = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["weeksales"],
    queryFn: async () => {
      return await fetchSalesForCurrentWeek();
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
