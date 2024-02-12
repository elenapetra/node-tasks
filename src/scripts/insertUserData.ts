import UserModel from "../models/schemas/user.model";
import connectDB from "../db";
const usersData = require("../data/users.json");

const insertUsersData = async () => {
  try {
    await UserModel.insertMany(usersData);
    console.log("User data inserted successfully.");
  } catch (error) {
    console.log("Error inserting user data: " + error);
  }
};

connectDB().then(() => insertUsersData());
