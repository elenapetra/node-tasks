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
const mongoose_1 = __importStar(require("mongoose"));
const cart_model_1 = require("./cart.model");
const orderSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: [cart_model_1.cartItemSchema], required: true },
    payment: {
        type: { type: String, required: true },
        address: mongoose_1.Schema.Types.Mixed,
        creditCard: mongoose_1.Schema.Types.Mixed,
    },
    delivery: {
        type: { type: String, required: true },
        address: { type: mongoose_1.Schema.Types.Mixed, required: true },
    },
    comments: { type: String, default: "" },
    status: { type: String, enum: ["created", "completed"], required: true },
    total: { type: Number, required: true },
});
const OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.default = OrderModel;
