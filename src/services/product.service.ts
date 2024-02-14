import { ProductEntity } from "../utils/types";
import {
  getAllProductsObjects,
  getProductObject,
} from "../repositories/product.repository";

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
  productId: string
): Promise<ProductEntity | undefined> => {
  try {
    const product = await getProductObject(productId);
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return;
  }
};
