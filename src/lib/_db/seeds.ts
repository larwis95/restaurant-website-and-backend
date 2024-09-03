import { Sale } from "@/models";
import mongoose from "mongoose";
const MONGODB_URI = "mongodb://localhost:27017/bigJoes";
import * as SALES_DATA from "./sales_data.json";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
};

const data = SALES_DATA.filter((sale) => {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (sale !== undefined && sale.date && sale.date.match(pattern)) {
    return sale;
  }
});

const sales = data.map((sale) => {
  return {
    date: sale.date,
    morning: parseInt(sale.morning?.replace(",", "") || "0"),
    night: parseInt(sale.night.replace(",", "")),
    holiday: sale.holiday || null,
  };
});

const seedDb = async () => {
  await connectDb();
  await Sale.insertMany(sales);
  console.log("Database seeded");
  process.exit(0);
};

seedDb();
