import { CustomRequest } from "../utils/types";
import { Response } from "express";
import { saveUserToDB, findUserByEmail } from "../repositories/user.repository";
import { registrationSchema, loginSchema } from "../utils/bodyValidation";
import { logger } from "../utils/logger";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { error, value } = registrationSchema.validate(req.body);

    if (error) {
      logger.error(
        `Registration validation error: ${error.details[0].message}`
      );
      res.status(400).json({
        data: null,
        error: { message: error.details[0].message },
      });
      return;
    }

    const { email, password, role } = value;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(409).json({
        data: null,
        error: {
          message: "User with this email already exists. Please Login",
        },
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword, role };
    const savedUser = await saveUserToDB(user);

    if (!savedUser) {
      res.status(500).json({
        data: null,
        error: { message: "Failed to save user to the database" },
      });
      return;
    }

    const { _id, email: savedEmail, role: savedRole } = savedUser;
    const responseData = {
      data: {
        id: _id,
        email: savedEmail,
        role: savedRole,
      },
      error: null,
    };

    logger.info("User registration successful");
    res.status(201).json(responseData);
  } catch (error) {
    logger.error("Error in registerUser:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal server error" },
    });
  }
};

export const loginUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        data: null,
        error: { message: error.details[0].message },
      });
      return;
    }

    const { email, password } = value;
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401).json({
        data: null,
        error: { message: "No user found with this email" },
      });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        data: null,
        error: { message: "Credentials are invalid" },
      });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      data: { token },
      error: null,
    });
  } catch (error) {
    logger.error("Error in loginUser:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal server error" },
    });
  }
};
