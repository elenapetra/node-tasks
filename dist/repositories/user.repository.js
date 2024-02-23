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
exports.findUserByEmail = exports.saveUserToDB = exports.getUserObject = void 0;
const user_model_1 = require("../models/schemas/user.model");
const logger_1 = require("../utils/logger");
const getUserObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ _id: userId });
        if (user) {
            return user.toObject();
        }
    }
    catch (error) {
        logger_1.logger.error("Error getting user data:", error);
    }
});
exports.getUserObject = getUserObject;
const saveUserToDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_model_1.UserModel(user);
        const saveUser = yield newUser.save();
        return saveUser.toObject();
    }
    catch (error) {
        logger_1.logger.error("Error saving user to the database:", error);
        return undefined;
    }
});
exports.saveUserToDB = saveUserToDB;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ email }).exec();
        return user ? user.toObject() : null;
    }
    catch (error) {
        logger_1.logger.error("Error finding user by email:", error);
        return null;
    }
});
exports.findUserByEmail = findUserByEmail;
