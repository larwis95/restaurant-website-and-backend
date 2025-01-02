import {
  eachDayOfInterval,
  isMonday,
  nextMonday,
  nextSunday,
  previousMonday,
} from "date-fns";

export const getWeekDates = (date: Date): Date[] => {
  const isMondayToday = isMonday(date);
  const start = isMondayToday ? date : previousMonday(date);
  const end = nextMonday(date);
  return eachDayOfInterval({
    start,
    end,
  });
};

export const getPreviousWeekDates = (): Date[] => {
  const isMondayToday = isMonday(new Date());
  const start = isMondayToday
    ? previousMonday(new Date())
    : previousMonday(new Date().setDate(new Date().getDate() - 7));
  const end = nextMonday(start);
  return eachDayOfInterval({ start, end });
};
