import mongoose from "mongoose";
import { logger } from "./utils/logger";

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shopDB";
    await mongoose.connect(URI);
    logger.info("Connected to MongoDB");
  } catch (error: any) {
    logger.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
