import { ProductEntity } from "../utils/types";
import {
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";

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
  productId: string
): Promise<ProductEntity | undefined> => {
  try {
    const product = await getProductById(productId);
    return product;
  } catch (error) {
    console.error("Error getting product:", error);
    return;
  }
};
