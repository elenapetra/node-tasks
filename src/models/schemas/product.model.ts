import mongoose from "mongoose";
import { ProductEntity } from "../../utils/types";

export const productSchema = new mongoose.Schema<ProductEntity>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model<ProductEntity>("Product", productSchema);

export default ProductModel;
