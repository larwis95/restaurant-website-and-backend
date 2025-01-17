import mongoose, { Schema, model } from "mongoose";
import { ApplicationSchema } from "./types";

const applicationSchema = new Schema<ApplicationSchema>({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Application ||
  model("Application", applicationSchema);
