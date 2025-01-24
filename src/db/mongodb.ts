import mongoose from "mongoose";
import { dbName } from "../contants";

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB \nError: " + error);
    process.exit(1);
  }
};

export { dbConnect };
