"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
// id: { type: Schema.Types.ObjectId, required: true },
});
exports.UserModel = mongoose_1.default.model("User", exports.userSchema);
