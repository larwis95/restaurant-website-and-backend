import { TrainingData } from "@/lib/api.types";
import * as tf from "@tensorflow/tfjs";
import { isAfter } from "date-fns";
import {
  ITrainModel,
  ITrainModelArgs,
} from "@/lib/controllers/prediction/prediction.interfaces";

declare global {
  var prediction: any;
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
    const [morningModel, nightModel] = models;
    const morningPrediction = morningModel.predict(
      tf.tensor1d([new Date().getDay()])
    ) as tf.Tensor;
    const nightPrediction = nightModel.predict(
      tf.tensor1d([new Date().getDay()])
    ) as tf.Tensor;
    cached.model = [
      Math.floor(morningPrediction.dataSync()[0]),
      Math.floor(nightPrediction.dataSync()[0]),
    ];
  } catch (error) {
    console.error("Error training model", error);
  }
  return cached.model;
};

export default getPrediction;
