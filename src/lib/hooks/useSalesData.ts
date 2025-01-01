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
