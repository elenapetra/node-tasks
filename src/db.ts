import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27018/shopDB";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
