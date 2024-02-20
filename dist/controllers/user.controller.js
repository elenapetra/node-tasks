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
exports.loginUser = exports.registerUser = void 0;
const user_repository_1 = require("../repositories/user.repository");
const bodyValidation_1 = require("../utils/bodyValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = bodyValidation_1.registrationSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                data: null,
                error: { message: error.details[0].message },
            });
            return;
        }
        const { email, password, role } = value;
        const existingUser = yield (0, user_repository_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(409).json({
                data: null,
                error: {
                    message: "User with this email already exists. Please Login",
                },
            });
            return;
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = { email, password: hashedPassword, role };
        const savedUser = yield (0, user_repository_1.saveUserToDB)(user);
        if (!savedUser) {
            res.status(500).json({
                data: null,
                error: { message: "Failed to save user to the database" },
            });
            return;
        }
        const { _id, email: savedEmail, role: savedRole } = savedUser;
        const responseData = {
            data: {
                id: _id,
                email: savedEmail,
                role: savedRole,
            },
            error: null,
        };
        res.status(201).json(responseData);
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            data: null,
            error: { message: "Internal server error" },
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = bodyValidation_1.loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                data: null,
                error: { message: error.details[0].message },
            });
            return;
        }
        const { email, password } = value;
        const user = yield (0, user_repository_1.findUserByEmail)(email);
        if (!user || !(yield bcrypt.compare(password, user.password))) {
            res.status(401).json({
                data: null,
                error: { message: "No user with such email or password" },
            });
            return;
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, `${process.env.JWT_SECRET}`, { expiresIn: "2h" });
        res.status(200).json({
            data: { token },
            error: null,
        });
    }
    catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({
            data: null,
            error: { message: "Internal server error" },
        });
    }
});
exports.loginUser = loginUser;
