import { IPrediction } from "@/lib/tensorflow";

export interface IPredictionProps {
  data: IPrediction | undefined;
  isPending: boolean;
  error: Error | null;
}

export interface IWeekCardProps {
  prediction: IPrediction | undefined;
}
