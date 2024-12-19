import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Trends from "./SalesGraph.Trends";
import { useState, useMemo } from "react";
import { UseSalesResponse } from "@/lib/hooks/hooks.types";
import useSalesGraphData from "@/lib/hooks/useSalesGraphData";
import { UTCDate } from "@date-fns/utc";
import { format } from "date-fns";

interface IGraphProps {
  data: UseSalesResponse;
}

const weekConfig = {
  morning: {
    label: "Morning",
    color: "#FFC107",
  },
  night: {
    label: "Night",
    color: "#FF5722",
  },
};

const monthConfig = {
  total: {
    label: "Total",
    color: "#FFC107",
  },
};

const labelMap = {
  currentWeek: "This Week",
  prevWeek: "Last Week",
  currentMonth: "This Month",
  prevMonth: "Last Month",
  currentYear: "This Year",
  prevYear: "Last Year",
};

const Graph: React.FC<IGraphProps> = ({ data }) => {
  const [activeChartType, setActiveChartType] = useState<
    "week" | "month" | "year"
  >("week");

  const [activeChart, setActiveChart] = useState<
    | "currentWeek"
    | "prevWeek"
    | "currentMonth"
    | "prevMonth"
    | "currentYear"
    | "prevYear"
  >("currentWeek");

  const { total, chartData } = useSalesGraphData(data);

  const trends = useMemo(() => {
    return {
      weeklyTrend:
        (total.currentWeek ?? 0) > (total.prevWeekToDay ?? 0) ? "up" : "down",
      monthlyTrend:
        (total.currentMonth ?? 0) > (total.prevMonthToDay ?? 0) ? "up" : "down",
      yearlyTrend:
        (total.currentYear ?? 0) > (total.prevYearToDay ?? 0) ? "up" : "down",
    };
  }, [total]) satisfies {
    weeklyTrend: "up" | "down";
    monthlyTrend: "up" | "down";
    yearlyTrend: "up" | "down";
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-background">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales Chart - Interactive</CardTitle>
          <CardDescription>
            Showing totals sales for the current and previous week, month, and
            year.
          </CardDescription>
        </div>
        <div className="flex overflow-x-scroll no-scrollbar">
          {[
            "currentWeek",
            "prevWeek",
            "currentMonth",
            "prevMonth",
            "currentYear",
            "prevYear",
          ].map((key) => {
            const chart = key as typeof activeChart;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => {
                  if (key === "currentWeek" || key === "prevWeek") {
                    setActiveChartType("week");
                  }
                  if (key === "currentMonth" || key === "prevMonth") {
                    setActiveChartType("month");
                  }
                  if (key === "currentYear" || key === "prevYear") {
                    setActiveChartType("year");
                  }
                  setActiveChart(chart);
                }}
              >
                <span className="text-xs text-muted-foreground">
                  {labelMap[key as keyof typeof labelMap]}
                </span>
                <span className="font-bold leading-none text-green-600">
                  ${total[key as keyof typeof total]?.toFixed(2) || 0}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 bg-background">
        <ChartContainer
          config={activeChartType === "week" ? weekConfig : monthConfig}
          className="aspect-auto h-[700px] w-full p-4"
        >
          <BarChart
            accessibilityLayer
            data={
              Array.isArray(chartData[activeChart])
                ? chartData[activeChart]
                : []
            }
            margin={{
              left: 12,
              right: 12,
            }}
            className="p-4"
          >
            <CartesianGrid vertical={false} className="p-10" />
            {activeChartType === "year" && (
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                minTickGap={20}
                tickFormatter={(value) => {
                  return format(new UTCDate(0, value, 1), "MMM");
                }}
              />
            )}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              minTickGap={20}
              tickFormatter={(value) => {
                return format(new UTCDate(value), "dd MMM");
              }}
            />
            <ChartTooltip
              labelFormatter={(label, payload) => {
                switch (activeChartType) {
                  case "week":
                    return format(new UTCDate(label), "EEEE, MMM dd");
                  case "month":
                    return format(new UTCDate(label), "dd MMM");
                  case "year":
                    return format(
                      new UTCDate(0, payload[0].payload?.month, 1),
                      "MMM"
                    );
                }
              }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey={activeChartType === "week" ? "morning" : "total"}
              fill={activeChartType === "week" ? "#FFC107" : "#FFC107"}
              barSize={32}
              stackId="stack"
            />
            {activeChartType === "week" && (
              <Bar
                dataKey="night"
                fill="#FF5722"
                stackId="stack"
                label={{ position: "top" }}
                barSize={32}
              />
            )}
          </BarChart>
        </ChartContainer>
        <CardFooter className="flex justify-end p-4 w-full">
          <Trends trends={trends} total={total} />
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Graph;
