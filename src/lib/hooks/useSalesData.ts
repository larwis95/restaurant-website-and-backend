import { useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchSalesForMonth,
  fetchSalesForWeek,
  fetchSalesForYear,
} from "../queries/sales/sales.get";
import { getWeekOfMonth } from "date-fns";
import { UseSalesResponse } from "./hooks.types";

const weekofMonth = getWeekOfMonth(new Date());
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const month = currentMonth === 0 ? 12 : currentMonth - 1;
const year = currentMonth === 0 ? currentYear - 1 : currentYear;
const prevWeek = weekofMonth === 1 ? 5 : weekofMonth;

const salesTypeMap = {
  currentWeek: async () => {
    return await fetchSalesForWeek({
      year: currentYear,
      month: currentMonth + 1,
      week: weekofMonth,
    });
  },
  prevWeek: async () => {
    return await fetchSalesForWeek({
      year,
      month,
      week: prevWeek,
    });
  },
  currentMonth: async () => {
    return await fetchSalesForMonth({
      year: currentYear,
      month: currentMonth + 1,
    });
  },
  prevMonth: async () => {
    return await fetchSalesForMonth({
      year,
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
      year,
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
