import { UserEntity } from "../utils/types";
import { UserModel } from "../models/schemas/user.model";

export const getUserById = async (
  userId: string
): Promise<UserEntity | undefined> => {
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return undefined;
    } else {
      return user.toObject();
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return undefined;
  }
};
