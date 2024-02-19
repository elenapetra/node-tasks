import { UserModel } from "../models/schemas/user.model";
import connectDB from "../db";
const usersData = require("../data/users.json");

const insertUsersData = async () => {
  try {
    await UserModel.insertMany(usersData);
  } catch (error) {
    console.error("Error inserting product data:", error);
  }
};

connectDB().then(() => insertUsersData());
