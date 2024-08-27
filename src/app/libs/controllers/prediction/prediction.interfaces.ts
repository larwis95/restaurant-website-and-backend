import { TrainingData } from "../../api.types";

export interface ITrainModelArgs {
  trainingData: TrainingData;
}

export interface ITrainModel {
  (): Promise<number[]>;
}
