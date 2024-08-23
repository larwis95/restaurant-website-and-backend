import mongoose, { Schema, model } from "mongoose";
import { MenuSchema } from "./types";

const menuSchema = new Schema<MenuSchema>({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

export default mongoose.models.Menu || model("Menu", menuSchema);
