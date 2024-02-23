import { ProductEntity } from "../utils/types";
import { ProductModel } from "../models/schemas/product.model";
import { logger } from "../utils/logger";

export const getAllProductsObjects = async (): Promise<ProductEntity[]> => {
  try {
    return await ProductModel.find().exec();
  } catch (error) {
    logger.error("Error fetching products from MongoDB:", error);
    return [];
  }
};

export const getProductObject = async (
  productId: string
): Promise<ProductEntity | undefined> => {
  try {
    const product = await ProductModel.findById(productId).exec();

    return product ? product.toJSON() : undefined;
  } catch (error) {
    logger.error("Error fetching product by ID from MongoDB:", error);
    return undefined;
  }
};
