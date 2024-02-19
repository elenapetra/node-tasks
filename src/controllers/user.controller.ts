import { CustomRequest } from "../utils/types";
import { Response } from "express";
import { isValidEmail } from "../utils/emailValidation";
import { saveUserToDB, findUserByEmail } from "../repositories/user.repository";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const registerUser = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    if (!email) {
      res.status(400).json({
        data: null,
        error: { message: "Email is required" },
      });
    } else if (!password) {
      res.status(400).json({
        data: null,
        error: { message: "Password is required" },
      });
    } else if (!role) {
      res.status(400).json({
        data: null,
        error: { message: "Role is required" },
      });
    } else if (!isValidEmail(email)) {
      res.status(400).json({
        data: null,
        error: {
          message: "Email is not valid",
        },
      });
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(409).json({
        data: null,
        error: {
          message: "User with this email already exists. Please Login",
        },
      });
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

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error in registerUser:", error);
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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        data: null,
        error: { message: "Email and password are required" },
      });
      return;
    }

    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        data: null,
        error: { message: "Invalid email or password" },
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
    console.error("Error in loginUser:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal server error" },
    });
  }
};
