import connectDB from "../db";
import { Response, Request } from "express";
import { logger } from "../utils/logger";

export const healthCheck = async (req: Request, res: Response) => {
  try {
    const serverStatus = "OK";
    await connectDB();

    res.status(200).json({
      status: serverStatus,
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
