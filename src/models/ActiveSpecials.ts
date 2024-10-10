import mongoose, { Schema, model } from "mongoose";
import { ActiveSpecialsSchema } from "./types";

const activeSpecialsSchema = new Schema<ActiveSpecialsSchema>({
  specials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Special",
    },
  ],
});

export default mongoose.models.ActiveSpecials ||
  model("ActiveSpecials", activeSpecialsSchema);
