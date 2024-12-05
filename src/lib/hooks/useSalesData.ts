import { useQuery } from "@tanstack/react-query";
import {
  fetchSalesForMonth,
  fetchSalesForWeek,
  fetchSalesForYear,
} from "../queries/sales/sales.get";
import { getWeekOfMonth } from "date-fns";
import { UseSalesResponse } from "./hooks.types";

const weekofMonth = getWeekOfMonth(new Date());
const currentMonth = new Date().getMonth();

console.log(weekofMonth, currentMonth);

const salesTypeMap = {
  currentWeek: async () => {
    return await fetchSalesForWeek({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: weekofMonth,
    });
  },
  prevWeek: async () => {
    return await fetchSalesForWeek({
      year: new Date().getFullYear(),
      month:
        weekofMonth === 1 ? new Date().getMonth() : new Date().getMonth() + 1,
      week: weekofMonth === 1 ? 5 : weekofMonth - 1,
    });
  },
  currentMonth: async () => {
    return await fetchSalesForMonth({
      year: new Date().getFullYear(),
      month: currentMonth + 1,
    });
  },
  prevMonth: async () => {
    return await fetchSalesForMonth({
      year:
        currentMonth === 1
          ? new Date().getFullYear() - 1
          : new Date().getFullYear(),
      month: currentMonth === 1 ? 12 : currentMonth,
    });
  },
  currentYear: async () => {
    return await fetchSalesForYear({
      year: new Date().getFullYear(),
    });
  },
  prevYear: async () => {
    return await fetchSalesForYear({
      year: new Date().getFullYear() - 1,
    });
  },
};

const useSalesData = (): UseSalesResponse => {
  const currentWeek = useQuery({
    queryKey: ["currentweek"],
    queryFn: salesTypeMap.currentWeek,
  });

  const prevWeek = useQuery({
    queryKey: ["prevweek"],
    queryFn: salesTypeMap.prevWeek,
  });

  const currentMonth = useQuery({
    queryKey: ["currentMonth"],
    queryFn: salesTypeMap.currentMonth,
  });

  const prevMonth = useQuery({
    queryKey: ["prevMonth"],
    queryFn: salesTypeMap.prevMonth,
  });

  const currentYear = useQuery({
    queryKey: ["currentYear"],
    queryFn: salesTypeMap.currentYear,
  });

  const prevYear = useQuery({
    queryKey: ["prevYear"],
    queryFn: salesTypeMap.prevYear,
  });

  return {
    currentWeek,
    prevWeek,
    currentMonth,
    prevMonth,
    currentYear,
    prevYear,
  };
};

export default useSalesData;
