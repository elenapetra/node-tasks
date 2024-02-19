import mongoose from "mongoose";
import { UserEntity } from "../../utils/types";

export const userSchema = new mongoose.Schema<UserEntity>({
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

export const UserModel = mongoose.model<UserEntity>("User", userSchema);
