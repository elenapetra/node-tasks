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
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const db_1 = __importDefault(require("../db"));
const usersData = require("../data/users.json");
const insertUsersData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const formattedData = usersData.map(() => ({}));
        yield user_model_1.default.insertMany(usersData);
        console.log("User data inserted successfully.");
    }
    catch (error) {
        console.log("Error inserting user data: " + error);
    }
});
(0, db_1.default)().then(() => insertUsersData());
