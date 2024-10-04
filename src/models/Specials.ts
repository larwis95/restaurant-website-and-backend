import mongoose, { Schema, model } from "mongoose";
import { SpecialSchema } from "./types";

const specialSchema = new Schema<SpecialSchema>({
  name: {
    type: String,
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
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Special || model("Special", specialSchema);
