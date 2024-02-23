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
exports.healthCheck = void 0;
const db_1 = __importDefault(require("../db"));
const logger_1 = require("../utils/logger");
const healthCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serverStatus = "OK";
        yield (0, db_1.default)();
        res.status(200).json({
            status: serverStatus,
            message: "Application is healthy",
        });
    }
    catch (error) {
        logger_1.logger.error("Health check failed:", error);
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        });
    }
});
exports.healthCheck = healthCheck;
