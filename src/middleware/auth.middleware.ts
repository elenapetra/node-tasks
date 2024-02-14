import { Request, Response, NextFunction } from "express";

import { UserEntity } from "../utils/types";
import { getUserObject } from "../repositories/user.repository";

export interface CustomRequest extends Request {
  user?: UserEntity;
  userId?: string;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.headers["x-user-id"];

  if (typeof userId !== "string") {
    return res.status(403).json({
      data: null,
      error: { message: "You must be an authorized user." },
    });
  }

  try {
    if (userId === "admin") {
      req.userId = userId;
    } else {
      const user = await getUserObject(userId);

      if (!(user && user.id === userId)) {
        return res.status(401).json({
          data: null,
          error: { message: "User is not authorized." },
        });
      }

      req.userId = userId;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
    });
  }

  next();
};
