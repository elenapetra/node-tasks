import mongoose from "mongoose";
import { UserEntity } from "../../utils/types";

const userSchema = new mongoose.Schema<UserEntity>({
  id: { type: String, required: true },
});

const UserModel = mongoose.model<UserEntity>("User", userSchema);

export default UserModel;
