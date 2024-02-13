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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserObjectById = exports.getAllUsers = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const dataFilePath = "src/data/users.json";
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(dataFilePath, "utf-8");
        return JSON.parse(data) || [];
    }
    catch (error) {
        console.error("Error reading users data:", error);
        return [];
    }
});
exports.getAllUsers = getAllUsers;
const getUserObjectById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, exports.getAllUsers)();
    const user = users.find((user) => user.id === userId);
    return user;
});
exports.getUserObjectById = getUserObjectById;
