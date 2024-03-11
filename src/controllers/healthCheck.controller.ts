import connectDB from "../db";
import { Response, Request } from "express";
import { logger } from "../utils/logger";
import mongoose from "mongoose";

export const healthCheck = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    res.status(200).json({
      status: "OK",
      message: "Application is healthy",
    });
  } catch (error) {
    logger.error("Health check failed:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
