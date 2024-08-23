import mongoose from "mongoose";

declare global {
  var mongo: any;
}

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_MONGODB_URI
    : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

const databaseConnection = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = await mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Error connecting to database", error);
  }
  return cached.conn;
};

export default databaseConnection;
