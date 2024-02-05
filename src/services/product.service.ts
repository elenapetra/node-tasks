import { ProductEntity } from "../utils/types";
import {
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";

export const getAllProductsService = async (): Promise<ProductEntity[]> => {
  const products = await getAllProducts();
  return products;
};

export const getProductByIdService = async (
  productId: string
): Promise<ProductEntity | undefined> => {
  const product = await getProductById(productId);

  return product;
};
