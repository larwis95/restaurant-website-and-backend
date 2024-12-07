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
      <CardHeader className="border-b">
        <CardTitle>Your Week Ahead</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-stretch justify-center space-y-0 border-b p-0 sm:flex-row bg-background">
        <div className="flex justify-center items-center overflow-x-scroll no-scrollbar px-10">
          {days.map((day) => {
            return (
              <div
                key={day}
                className={`flex flex-col justify-start p-8 items-start border-l border-r ${day === currentDay ? "border-green-500" : null}`}
              >
                <h3 className="text-lg">{day}</h3>
                <CardDescription
                  className={`flex flex-col justify-start items-start`}
                >
                  <h3 className="text-sm">
                    $
                    {prediction[
                      day.toLowerCase() as keyof IPrediction
                    ]?.morning?.toFixed(2)}
                  </h3>
                  <h3 className="text-sm">
                    $
                    {prediction[
                      day.toLowerCase() as keyof IPrediction
                    ]?.night?.toFixed(2)}
                  </h3>
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
