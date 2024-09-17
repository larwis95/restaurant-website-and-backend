import getPrediction from "@/lib/tensorflow";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Sale } from "@/models";
import getErrorMessage from "@/lib/getErrorMessage";
import databaseConnection from "@/lib/db";
import { SaleSchema } from "@/models/types";
import { ITrainModelArgs } from "./prediction.interfaces";

const sales = async (): Promise<SaleSchema[] | null> => {
  await databaseConnection();
  try {
    const sales = (await Sale.find()) as SaleSchema[];
    return sales;
  } catch (error) {
    return null;
  }
};

const predict = async (req: NextRequest, res: NextApiResponse) => {
  const trainingData = await sales();
  if (!trainingData) {
    return NextResponse.json(
      { error: "Error fetching sales data." },
      { status: 500 }
    );
  }
  const [morningPrediction, nightPrediction] =
    await getPrediction<ITrainModelArgs>(trainingData);
  return NextResponse.json(
    {
      morningPrediction,
      nightPrediction,
    },
    { status: 200 }
  );
};

export default predict;
