"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.productSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});
exports.ProductModel = mongoose_1.default.model("Product", exports.productSchema);
