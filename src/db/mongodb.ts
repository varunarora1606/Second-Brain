import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/second-brain`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB \nError: " + error);
    process.exit(1);
  }
};

export { DbConnect };
