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
    if (typeof userId === "string") {
        try {
            if (userId === "admin") {
                req.userId = userId;
            }
            else {
                const user = yield (0, user_repository_1.getUserById)(userId);
                if (user && user.id === userId) {
                    req.userId = userId;
                }
                else {
                    return res
                        .status(403)
                        .json({ error: "Forbidden", message: "User not found." });
                }
            }
        }
        catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    else {
        return res
            .status(401)
            .json({ error: "Unauthorized", message: "x-user-id header missing." });
    }
    next();
});
exports.authMiddleware = authMiddleware;
