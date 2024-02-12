"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.cartSchema = exports.cartItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
exports.cartItemSchema = new mongoose_1.default.Schema({
    product: { type: product_model_1.productSchema, required: true },
    count: { type: Number, required: true },
});
exports.cartSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    items: { type: [exports.cartItemSchema], required: true },
});
exports.CartModel = mongoose_1.default.model("Cart", exports.cartSchema);
