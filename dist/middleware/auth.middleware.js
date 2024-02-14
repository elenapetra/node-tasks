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
exports.authMiddleware = void 0;
const user_repository_1 = require("../repositories/user.repository");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["x-user-id"];
    if (typeof userId !== "string") {
        return res.status(403).json({
            data: null,
            error: { message: "You must be an authorized user." },
        });
    }
    try {
        if (userId === "admin") {
            req.userId = userId;
        }
        else {
            const user = yield (0, user_repository_1.getUserObject)(userId);
            if (!user || user._id.toString() !== userId) {
                return res.status(401).json({
                    data: null,
                    error: { message: "User is not authorized." },
                });
            }
            req.userId = userId;
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            data: null,
            error: { message: "Internal Server Error" },
        });
    }
    next();
});
exports.authMiddleware = authMiddleware;
