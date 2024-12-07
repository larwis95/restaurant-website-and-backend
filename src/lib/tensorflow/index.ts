import { TrainingData } from "@/lib/api.types";
import * as tf from "@tensorflow/tfjs";

import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isAfter,
  format,
} from "date-fns";
import {
  ITrainModel,
  ITrainModelArgs,
} from "@/lib/controllers/prediction/prediction.interfaces";

declare global {
  var prediction: any;
}

interface IPredictionTensors {
  monday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  tuesday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  wednesday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  thursday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  friday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  saturday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
  sunday: {
    morning: tf.Tensor | null;
    night: tf.Tensor | null;
  };
}

export interface IPrediction {
  monday: {
    morning: number | null;
    night: number | null;
  };
  tuesday: {
    morning: number | null;
    night: number | null;
  };
  wednesday: {
    morning: number | null;
    night: number | null;
  };
  thursday: {
    morning: number | null;
    night: number | null;
  };
  friday: {
    morning: number | null;
    night: number | null;
  };
  saturday: {
    morning: number | null;
    night: number | null;
  };
  sunday: {
    morning: number | null;
    night: number | null;
  };
}

let cached = global.prediction;

if (!cached) {
  cached = global.prediction = { model: null, promise: null, date: null };
}

const isModelOutdated = (date: Date): boolean => {
  if (cached.date) {
    return isAfter(date, cached.date);
  }
  return true;
};

export const clearCache = () => {
  cached.model = null;
  cached.promise = null;
  cached.date = null;
};

const getPrediction = async <ITrainModelArgs>(
  trainingData: TrainingData
): Promise<number[]> => {
  const models = [];

  if (isModelOutdated(new Date())) {
    cached.model = null;
    cached.promise = null;
    cached.date = new Date();
  }
  if (cached.model) {
    return cached.model;
  }

  if (!cached.promise) {
    const nightData = trainingData.map((day) => {
      return { date: day.date, sales: day.night };
    });
    const morningData = trainingData.map((day) => {
      return { date: day.date, sales: day.morning };
    });

    const morningModel = tf.sequential();
    const nightModel = tf.sequential();
    models.push(morningModel, nightModel);
    for (const model of models) {
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
      model.resetStates();
    }
    const xs: tf.Tensor1D = tf.tensor1d(
      morningData.map((data) => new Date(data.date).getDay())
    );
    const ys: tf.Tensor1D = tf.tensor1d(morningData.map((data) => data.sales));
    const xs2: tf.Tensor1D = tf.tensor1d(
      nightData.map((data) => new Date(data.date).getDay())
    );
    const ys2: tf.Tensor1D = tf.tensor1d(nightData.map((data) => data.sales));
    cached.promise = await Promise.all([
      morningModel.fit(xs, ys, { epochs: 100 }),
      nightModel.fit(xs2, ys2, { epochs: 100 }),
    ]);
  }
  try {
    const currentWeekDates = eachDayOfInterval({
      start: startOfWeek(new Date(), { weekStartsOn: 1 }),
      end: endOfWeek(new Date(), { weekStartsOn: 1 }),
    });
    const [morningModel, nightModel] = models;
    const prediction = currentWeekDates.reduce<IPredictionTensors>(
      (acc, date, index) => {
        const day = format(date, "EEEE").toLowerCase() as keyof IPrediction;
        if (!acc[day]) {
          acc[day] = { morning: null, night: null };
        }
        if (acc[day].morning === null) {
          acc[day].morning = morningModel.predict(
            tf.tensor1d([date.getDay()])
          ) as tf.Tensor;
        }
        if (acc[day].night === null) {
          acc[day].night = nightModel.predict(
            tf.tensor1d([date.getDay()])
          ) as tf.Tensor;
        }
        return acc;
      },
      {} as IPredictionTensors
    );

    cached.model = currentWeekDates.reduce<IPrediction>((acc, date) => {
      const day = format(date, "EEEE").toLowerCase() as keyof IPrediction;
      if (!acc[day]) {
        acc[day] = { morning: null, night: null };
      }
      acc[day].morning = (prediction[day].morning as tf.Tensor).dataSync()[0];
      acc[day].night = (prediction[day].night as tf.Tensor).dataSync()[0];
      return acc;
    }, {} as IPrediction);
  } catch (error) {
    console.error("Error training model", error);
  }
  return cached.model;
};

export default getPrediction;
