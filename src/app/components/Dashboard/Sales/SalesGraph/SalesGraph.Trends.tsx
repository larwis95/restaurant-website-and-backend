import Arrow from "@/app/components/Arrow";

interface ITrendsProps {
  total: {
    currentWeek?: number;
    prevWeekToDay?: number;
    currentMonth?: number;
    prevMonthToDay?: number;
    currentYear?: number;
    prevYearToDay?: number;
  };
  trends: {
    weeklyTrend: "up" | "down";
    monthlyTrend: "up" | "down";
    yearlyTrend: "up" | "down";
  };
}

const Trends: React.FC<ITrendsProps> = ({ total, trends }) => {
  const trendPercentage = (current: number, prev: number) => {
    const result = ((current - prev) / prev) * 100;
    if (isNaN(result)) {
      return "Error Calculating Percentage";
    }
    if (result === Infinity) {
      return "100%";
    }
    return result.toFixed(2) + "%";
  };

  return (
    <div className="flex flex-row flex-wrap xl:justify-end sm:justify-center w-full">
      <div className="flex flex-col w-full p-2 xl:items-end lg:items-end md:items-ends sm:items-center">
        <div className="flex flex-col w-fit justify-start">
          <h2 className="w-fit text-lg">Sales Trends</h2>
          <p className="text-gray-500 text-sm w-fit">
            Your sales trends calculated to current date.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 border-border border p-2">
        <p className="text-lg">Weekly Sales</p>
        <Arrow
          direction={trends.weeklyTrend}
          className={
            trends.weeklyTrend === "down" ? "text-red-500" : "text-green-500"
          }
        />
        <p className="text text-muted">
          {trendPercentage(total.currentWeek ?? 0, total.prevWeekToDay ?? 0)}
        </p>
      </div>
      <div className="flex items-center gap-2 border-border border p-2">
        <p className="text-lg">Monthly Sales</p>
        <Arrow
          direction={trends.monthlyTrend}
          className={
            trends.monthlyTrend === "down" ? "text-red-500" : "text-green-500"
          }
        />
        <p className="text text-muted">
          {trendPercentage(total.currentMonth ?? 0, total.prevMonthToDay ?? 0)}
        </p>
      </div>
      <div className="flex items-center gap-2 border-border border p-2">
        <p className="text-lg">Yearly Sales</p>
        <Arrow
          direction={trends.yearlyTrend}
          className={
            trends.yearlyTrend === "down" ? "text-red-500" : "text-green-500"
          }
        />
        <p className="text text-muted">
          {trendPercentage(total.currentYear ?? 0, total.prevYearToDay ?? 0)}
        </p>
      </div>
    </div>
  );
};

export default Trends;
