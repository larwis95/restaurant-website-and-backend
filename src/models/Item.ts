import mongoose, { Schema, model } from "mongoose";
import { ItemSchema } from "./types";

const itemSchema = new Schema<ItemSchema>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Item || model("Item", itemSchema);
