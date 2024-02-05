import { ProductEntity } from "../utils/types";
import fs from "fs/promises";

const dataFilePath = "src/data/products.json";

export const getAllProducts = async (): Promise<ProductEntity[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products data:", error);
    return [];
  }
};

export const getProductById = async (
  productId: string
): Promise<ProductEntity | undefined> => {
  const products = await getAllProducts();
  const product = products.find(
    (product: ProductEntity) => product.id === productId
  );
  return product;
};
