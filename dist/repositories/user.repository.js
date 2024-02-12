"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const user_model_1 = require("../models/schemas/user.model");
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
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userId: ", userId);
        const user = yield user_model_1.UserModel.findOne({ _id: userId });
        // console.log(user);
        if (!user) {
            console.log("User not found");
            return undefined;
        }
        else {
            console.log("User found successfully: ", user.toObject());
            return user.toObject();
        }
    }
    catch (error) {
        console.error("Error getting user data:", error);
        return undefined;
    }
});
exports.getUserById = getUserById;
