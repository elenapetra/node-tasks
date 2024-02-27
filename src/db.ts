import mongoose from "mongoose";
import { logger } from "./utils/logger";

const isDockerized = process.env.DOCKERIZED === "true";

const URI = isDockerized
  ? "mongodb://mongo:27017/shopDB"
  : "mongodb://127.0.0.1:27017/shopDB";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    logger.info("Connected to MongoDB");
  } catch (error: any) {
    logger.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectDB;
