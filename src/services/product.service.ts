import { ProductEntity } from "../utils/types";
import {
  getAllProductsObjects,
  getProductObject,
} from "../repositories/product.repository";
import { Types } from "mongoose";

export const getProductsList = async (): Promise<ProductEntity[]> => {
  try {
    const products = await getAllProductsObjects();
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};

export const getProductById = async (
  productId: string | Types.ObjectId
): Promise<ProductEntity | undefined> => {
  try {
    const product = await getProductObject(productId.toString());
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return;
  }
};
