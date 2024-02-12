import mongoose from "mongoose";
import { Document, ObjectId } from "mongoose";
import { ProductEntity } from "../../utils/types";

export const productSchema = new mongoose.Schema<ProductEntity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ProductModel = mongoose.model<ProductEntity>(
  "Product",
  productSchema
);
