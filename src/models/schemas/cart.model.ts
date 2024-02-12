import mongoose from "mongoose";
import { CartEntity, CartItemEntity } from "../../utils/types";
import { productSchema } from "./product.model";

export const cartItemSchema = new mongoose.Schema<CartItemEntity>({
  product: { type: productSchema, required: true },
  count: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema<CartEntity>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [cartItemSchema], required: true },
});

const CartModel = mongoose.model<CartEntity>("Cart", cartSchema);

export default CartModel;
