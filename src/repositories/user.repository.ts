import { UserEntity } from "../utils/types";
import UserModel from "../models/schemas/user.model";
import fs from "fs/promises";

const dataFilePath = "src/data/users.json";

// export const getAllUsers = async (): Promise<UserEntity[]> => {
//   try {
//     const data = await fs.readFile(dataFilePath, "utf-8");
//     return JSON.parse(data) || [];
//   } catch (error) {
//     console.error("Error reading users data:", error);
//     return [];
//   }
// };

// export const getUserById = async (
//   userId: string
// ): Promise<UserEntity | undefined> => {
//   const users = await getAllUsers();
//   const user = users.find((user: UserEntity) => user.id === userId);
//   return user;
// };

export const getUserById = async (
  userId: string
): Promise<UserEntity | undefined> => {
  try {
    const user = await UserModel.findOne({ id: userId });
    console.log(user);
    if (!user) {
      console.log("User not found");
      return undefined;
    } else {
      console.log("User found successfully: ", user.toObject());
      return user.toObject();
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return undefined;
  }
};
