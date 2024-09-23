import { User } from "@/models";
import mongoose from "mongoose";
import * as USER_DATA from "./base_user.json";

const MONGODB_URI = "mongodb://localhost:27017/bigJoes";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
};

const seedDb = async () => {
  await connectDb();
  try {
    for (const user of USER_DATA) {
      await User.create(user);
    }
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDb();
