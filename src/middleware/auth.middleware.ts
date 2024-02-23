import { Response, NextFunction } from "express";
import { getUserObject } from "../repositories/user.repository";
import { CustomRequest } from "../utils/types";
const jwt = require("jsonwebtoken");
import { JsonWebTokenError } from "jsonwebtoken";
import { logger } from "../utils/logger";

export const authenticateMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(403).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
      const userId = decodedToken.userId;

      const user = await getUserObject(userId);
      if (!user) {
        res.status(403).json({
          data: null,
          error: { message: "User is not authorized" },
        });
        return;
      }

      req.user = user;
      req.userId = userId;
      req.userRole = user.role;

      next();
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        res.status(401).json({
          data: null,
          error: { message: "User is not authorized" },
        });
      } else {
        logger.error("Error in authenticateMiddleware:", error);
        res.status(500).json({
          data: null,
          error: { message: "Internal Server Error" },
        });
      }
    }
  } catch (error) {
    logger.error("Error in authenticateMiddleware:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
    });
  }
};

export const authorizeMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userRole = req.userRole;

    if (userRole !== "admin") {
      res.status(403).json({
        data: null,
        error: { message: "Forbidden: Only admin users are allowed" },
      });
      return;
    }
    next();
  } catch (error) {
    logger.error("Error in authorizeMiddleware:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
    });
  }
};
