import { ProductEntity } from "../utils/types";
import {
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";
import { ObjectId, Types } from "mongoose";

export const getAllProductsService = async (): Promise<ProductEntity[]> => {
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const getProductByIdService = async (
  productId: string | Types.ObjectId
): Promise<ProductEntity | undefined> => {
  try {
    const product = await getProductById(productId.toString());
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return;
  }
};
