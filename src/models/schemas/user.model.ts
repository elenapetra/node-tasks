import mongoose from "mongoose";
import { UserEntity } from "../../utils/types";

export const userSchema = new mongoose.Schema<UserEntity>({});

export const UserModel = mongoose.model<UserEntity>("User", userSchema);
