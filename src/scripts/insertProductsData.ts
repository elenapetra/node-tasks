import { ProductModel } from "../models/schemas/product.model";
import connectDB from "../db";
const productsData = require("../data/products.json");
import { logger } from "../utils/logger";

const insertProductsData = async () => {
  try {
    await ProductModel.insertMany(productsData);
  } catch (error) {
    logger.error("Error inserting product data:", error);
  }
};

connectDB().then(() => insertProductsData());
