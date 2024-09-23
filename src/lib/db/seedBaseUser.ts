import { User } from "@/models";
import mongoose from "mongoose";
import * as USER_DATA from "./base_user.json";

const MONGODB_URI = undefined;
const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error(err);
  }
  return mongoose.connection;
};

const seedDb = async () => {
  try {
    await connectDb();
    for (const user of USER_DATA) {
      await User.create(user);
    }
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDb();
