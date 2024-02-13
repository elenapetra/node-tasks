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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./middleware/auth.middleware");
const CartController = __importStar(require("./controllers/cart.controller"));
const ProductController = __importStar(require("./controllers/product.controller"));
const OrderController = __importStar(require("./controllers/order.controller"));
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8000;
const userRouter = express.Router();
const productRouter = express.Router();
userRouter.use(auth_middleware_1.authMiddleware);
productRouter.use(auth_middleware_1.authMiddleware);
app.use(bodyParser.json());
userRouter.get("/cart", CartController.getUserCart);
userRouter.put("/cart", CartController.updateUserCart);
userRouter.delete("/cart", CartController.deleteUserCart);
userRouter.post("/cart/checkout", OrderController.createUserOrder);
productRouter.get("/products", ProductController.getAllProducts);
productRouter.get("/products/:productId", ProductController.getProduct);
app.use("/api/profile", userRouter);
app.use("/api/", productRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
