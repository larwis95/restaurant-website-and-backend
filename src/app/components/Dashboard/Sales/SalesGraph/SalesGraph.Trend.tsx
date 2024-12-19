import Arrow from "@/app/components/Arrow";

interface ITrendProps {
  trend: "up" | "down";
  trendPercentage: string;
  type: "week" | "month" | "year";
}

const Trend: React.FC<ITrendProps> = ({ trend, trendPercentage, type }) => {
  const titleCase = (str: string) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex flex-col flex-1 items-center gap-2 border-border border p-2">
      <p className="text-lg">{titleCase(type)}</p>
      <div className="flex flex-row justify-start">
        <Arrow
          direction={trend}
          className={trend === "down" ? "text-red-500" : "text-green-500"}
        />
        <p className="text text-muted">{trendPercentage}</p>
      </div>
    </div>
  );
};

export default Trend;
