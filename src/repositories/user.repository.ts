import { UserEntity } from "../utils/types";
import { UserModel } from "../models/schemas/user.model";

export const getUserById = async (
  userId: string
): Promise<UserEntity | undefined> => {
  try {
    console.log("userId: ", userId);
    const user = await UserModel.findOne({ _id: userId });
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
