"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.productRouter = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const CartController = __importStar(require("./controllers/cart.controller"));
const ProductController = __importStar(require("./controllers/product.controller"));
const OrderController = __importStar(require("./controllers/order.controller"));
const UserController = __importStar(require("./controllers/user.controller"));
const auth_middleware_1 = require("./middleware/auth.middleware");
exports.userRouter = express_1.default.Router();
exports.productRouter = express_1.default.Router();
exports.authRouter = express_1.default.Router();
exports.userRouter.get("/cart", auth_middleware_1.authenticateMiddleware, CartController.getUserCart);
exports.userRouter.put("/cart", auth_middleware_1.authenticateMiddleware, CartController.updateUserCart);
exports.userRouter.delete("/cart", auth_middleware_1.authenticateMiddleware, auth_middleware_1.authorizeMiddleware, CartController.deleteUserCart);
exports.userRouter.post("/cart/checkout", auth_middleware_1.authenticateMiddleware, OrderController.createUserOrders);
exports.productRouter.get("/products", auth_middleware_1.authenticateMiddleware, ProductController.getProducts);
exports.productRouter.get("/products/:productId", auth_middleware_1.authenticateMiddleware, ProductController.getProduct);
exports.authRouter.post("/register", UserController.registerUser);
exports.authRouter.post("/login", UserController.loginUser);
