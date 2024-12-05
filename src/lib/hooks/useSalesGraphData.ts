import { useMemo } from "react";
import { UseSalesResponse } from "./hooks.types";
import { getMonth, getDay, getDate, getDayOfYear } from "date-fns";

const useSalesGraphData = (data: UseSalesResponse) => {
  const {
    currentWeek,
    currentMonth,
    currentYear,
    prevMonth,
    prevWeek,
    prevYear,
  } = data;

  const total = useMemo(
    () => ({
      currentWeek: currentWeek.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      currentMonth: currentMonth.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      currentYear: currentYear.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      prevWeek: prevWeek.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      prevWeekToDay: prevWeek.data?.reduce((acc, curr) => {
        if (getDay(curr.date) < getDay(new Date())) {
          return acc + curr.morning + curr.night;
        }
        return acc;
      }, 0),
      prevMonth: prevMonth.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      prevMonthToDay: prevMonth.data?.reduce((acc, curr) => {
        if (getDate(curr.date) < getDate(new Date())) {
          return acc + curr.morning + curr.night;
        }
        return acc;
      }, 0),
      prevYear: prevYear.data?.reduce(
        (acc, curr) => acc + curr.morning + curr.night,
        0
      ),
      prevYearToDay: prevYear.data?.reduce((acc, curr) => {
        if (getDayOfYear(curr.date) < getDayOfYear(new Date())) {
          return acc + curr.morning + curr.night;
        }
        return acc;
      }, 0),
    }),
    [
      currentWeek.data,
      currentMonth.data,
      currentYear.data,
      prevWeek.data,
      prevMonth.data,
      prevYear.data,
    ]
  );

  const chartData = useMemo(
    () => ({
      currentWeek: currentWeek.data,
      currentMonth: currentMonth.data?.map((item, index) => ({
        date: item.date,
        total: item.morning + item.night,
      })),
      currentYear: currentYear.data?.reduce<{ month: number; total: number }[]>(
        (acc, curr) => {
          const month = getMonth(curr.date);
          const total = curr.morning + curr.night;
          const index = acc.findIndex((item) => item.month === month);
          if (index !== -1) {
            acc[index].total += total;
          } else {
            acc.push({ month, total });
          }
          return acc;
        },
        []
      ),
      prevWeek: prevWeek.data,
      prevMonth: prevMonth.data?.map((item, index) => ({
        date: item.date,
        total: item.morning + item.night,
      })),
      prevYear: prevYear.data?.reduce<{ month: number; total: number }[]>(
        (acc, curr) => {
          const month = getMonth(curr.date);
          const total = curr.morning + curr.night;
          const index = acc.findIndex((item) => item.month === month);
          if (index !== -1) {
            acc[index].total += total;
          } else {
            acc.push({ month, total });
          }
          return acc;
        },
        []
      ),
    }),
    [
      currentMonth.data,
      currentYear.data,
      prevMonth.data,
      prevYear.data,
      currentWeek.data,
      prevWeek.data,
    ]
  );

  return { total, chartData };
};

export default useSalesGraphData;
