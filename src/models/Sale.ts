import mongoose, { Schema, model } from "mongoose";
import { SaleSchema } from "./types";

const saleSchema = new Schema<SaleSchema>({
  date: {
    type: Date,
    index: true,
    required: true,
    unique: true,
  },
  morning: {
    type: Number,
    required: true,
  },
  night: {
    type: Number,
    required: true,
  },
  holiday: {
    type: String,
  },
});

export default mongoose.models.Sale || model("Sale", saleSchema);
