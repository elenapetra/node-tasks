"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.configureLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const configureLogger = () => {
    const logger = winston_1.default.createLogger({
        level: process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
            ? "debug"
            : "info",
        format: winston_1.default.format.simple(),
        transports: [new winston_1.default.transports.Console()],
    });
    return logger;
};
exports.configureLogger = configureLogger;
exports.logger = (0, exports.configureLogger)();
