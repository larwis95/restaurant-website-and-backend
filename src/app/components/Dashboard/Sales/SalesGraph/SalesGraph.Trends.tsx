import Trend from "./SalesGraph.Trend";

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
      return "Error";
    }
    if (result === Infinity) {
      return "100%";
    }
    return result.toFixed(2) + "%";
  };

  const trendTypes = ["week", "month", "year"];

  return (
    <div className="flex flex-col flex-wrap items-end w-full">
      <div className="flex justify-end items-end flex-col w-full p-2">
        <div className="flex flex-col w-fit justify-start">
          <h2 className="w-fit text-lg">Sales Trends</h2>
          <p className="text-gray-500 text-sm w-fit">
            Your sales trends calculated to current date.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap w-1/3 justify-end items-end">
        {trendTypes.map((type) => {
          const trendKey = `${type}lyTrend` as keyof typeof trends;
          const currentKey =
            `current${type[0].toUpperCase()}${type.slice(1)}` as keyof typeof total;
          const prevKey = `prev${type}ToDay` as keyof typeof total;
          return (
            <Trend
              key={type}
              trend={trends[trendKey]}
              trendPercentage={trendPercentage(
                total[currentKey] || 0,
                total[prevKey] || 0
              )}
              type={type as "week" | "month" | "year"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Trends;
