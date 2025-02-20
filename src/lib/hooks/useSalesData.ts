import { useQueries } from "@tanstack/react-query";
import {
  fetchSalesForMonth,
  fetchSalesForCurrentWeek,
  fetchSalesForPreviousWeek,
  fetchSalesForYear,
} from "../queries/sales/sales.get";
import { UseSalesResponse } from "./hooks.types";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const month = currentMonth === 0 ? 12 : currentMonth - 1;

const salesTypeMap = {
  currentWeek: async () => {
    return await fetchSalesForCurrentWeek();
  },
  prevWeek: async () => {
    return await fetchSalesForPreviousWeek();
  },
  currentMonth: async () => {
    return await fetchSalesForMonth({
      year: currentYear,
      month: currentMonth,
    });
  },
  prevMonth: async () => {
    return await fetchSalesForMonth({
      year: currentYear,
      month,
    });
  },
  currentYear: async () => {
    return await fetchSalesForYear({
      year: currentYear,
    });
  },
  prevYear: async () => {
    return await fetchSalesForYear({
      year: currentYear - 1,
    });
  },
};

const useSalesData = (): UseSalesResponse => {
  const data = useQueries({
    queries: Object.keys(salesTypeMap).map((key) => ({
      queryKey: [key],
      queryFn: salesTypeMap[key as keyof typeof salesTypeMap],
    })),
  });

  return {
    currentWeek: data[0],
    prevWeek: data[1],
    currentMonth: data[2],
    prevMonth: data[3],
    currentYear: data[4],
    prevYear: data[5],
  };
};

export default useSalesData;
