"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
exports.cartItemSchema = new mongoose_1.default.Schema({
    product: { type: product_model_1.productSchema, required: true },
    count: { type: Number, required: true },
});
const cartSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    items: { type: [exports.cartItemSchema], required: true },
});
const CartModel = mongoose_1.default.model("Cart", cartSchema);
exports.default = CartModel;
