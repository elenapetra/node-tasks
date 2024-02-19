import { UserEntity } from "../utils/types";
import { UserModel } from "../models/schemas/user.model";

export const getUserObject = async (
  userId: string
): Promise<UserEntity | undefined> => {
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (user) {
      return user.toObject();
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }
};

export const saveUserToDB = async (
  user: Partial<UserEntity>
): Promise<UserEntity | undefined> => {
  try {
    const newUser = new UserModel(user);
    const saveUser = await newUser.save();
    return saveUser.toObject();
  } catch (error) {
    console.error("Error saving user to the database:", error);
    return undefined;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
};
