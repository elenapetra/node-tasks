import mongoose from "mongoose";
import { UserEntity } from "../../utils/types";

export const userSchema = new mongoose.Schema<UserEntity>({
  // id: { type: Schema.Types.ObjectId, required: true },
});

export const UserModel = mongoose.model<UserEntity>("User", userSchema);
