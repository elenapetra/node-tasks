import mongoose, { Schema } from "mongoose";
import { OrderEntity } from "../../utils/types";
import { cartItemSchema } from "./cart.model";

export const orderSchema = new mongoose.Schema<OrderEntity>({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [cartItemSchema], required: true },
  payment: {
    type: { type: String, required: true },
    address: Schema.Types.Mixed,
    creditCard: Schema.Types.Mixed,
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed, required: true },
  },
  comments: { type: String, default: "" },
  status: { type: String, enum: ["created", "completed"], required: true },
  total: { type: Number, required: true },
});

export const OrderModel = mongoose.model<OrderEntity>("Order", orderSchema);
