import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPrediction } from "@/lib/tensorflow";
import { format } from "date-fns";
import { IWeekCardProps } from "./Prediction.interfaces";

const WeekCalendar: React.FC<IWeekCardProps> = ({ prediction }) => {
  const currentDay = format(new Date(), "EEEE");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return prediction ? (
    <Card className="bg-background overflow-hidden">
      <CardHeader className="flex items-start justify-start border-b pb-2">
        <CardTitle className="text-2xl">Your Week Ahead</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch justify-stretch space-y-0 border-b p-0 sm:flex-row bg-background">
        <div className="flex flex-1 justify-center items-center overflow-x-scroll no-scrollbar w-full">
          {days.map((day) => {
            return (
              <div
                key={day}
                className={`flex flex-col p-8 border-l border-r ${day === currentDay ? "border-green-500 border-r-4 border-l-4" : null}`}
              >
                <h3 className="text-lg">{day}</h3>
                <CardDescription
                  className={`flex flex-col justify-start items-start text-sm`}
                >
                  $
                  {prediction[
                    day.toLowerCase() as keyof IPrediction
                  ]?.morning?.toFixed(2)}
                </CardDescription>
                <CardDescription className="flex flex-col justify-start items-start text-sm">
                  $
                  {prediction[
                    day.toLowerCase() as keyof IPrediction
                  ]?.night?.toFixed(2)}
                </CardDescription>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  ) : null;
};

export default WeekCalendar;
