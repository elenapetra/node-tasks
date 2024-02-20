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
exports.authorizeMiddleware = exports.authenticateMiddleware = void 0;
const user_repository_1 = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(403).json({
                data: null,
                error: { message: "You must be an authorized user" },
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
            const userId = decodedToken.userId;
            const user = yield (0, user_repository_1.getUserObject)(userId);
            if (!user) {
                res.status(403).json({
                    data: null,
                    error: { message: "User is not authorized" },
                });
                return;
            }
            req.user = user;
            req.userId = userId;
            req.userRole = user.role;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                res.status(401).json({
                    data: null,
                    error: { message: "User is not authorized" },
                });
            }
            else {
                console.error("Error in authenticateMiddleware:", error);
                res.status(500).json({
                    data: null,
                    error: { message: "Internal Server Error" },
                });
            }
        }
    }
    catch (error) {
        console.error("Error in authenticateMiddleware:", error);
        res.status(500).json({
            data: null,
            error: { message: "Internal Server Error" },
        });
    }
});
exports.authenticateMiddleware = authenticateMiddleware;
const authorizeMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = req.userRole;
        if (userRole !== "admin") {
            res.status(403).json({
                data: null,
                error: { message: "Forbidden: Only admin users are allowed" },
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error in authorizeMiddleware:", error);
        res.status(500).json({
            data: null,
            error: { message: "Internal Server Error" },
        });
    }
});
exports.authorizeMiddleware = authorizeMiddleware;
