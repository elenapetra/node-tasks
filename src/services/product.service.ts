import { ProductEntity } from "../utils/types";
import {
  getAllProducts,
  getProductObjectById,
} from "../repositories/product.repository";

export const getProducts = async (): Promise<ProductEntity[]> => {
  try {
    const products = await getAllProducts();
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
    const product = await getProductObjectById(productId);
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return;
  }
};
