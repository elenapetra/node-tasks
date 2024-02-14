import { ProductModel } from "../models/schemas/product.model";
import connectDB from "../db";
const productsData = require("../data/products.json");

const insertProductsData = async () => {
  try {
    await ProductModel.insertMany(productsData);
  } catch (error) {
    console.error("Error inserting product data:", error);
  }
};

connectDB().then(() => insertProductsData());
