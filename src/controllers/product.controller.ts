import { Request, Response } from "express";
import {
  getAllProductsService,
  getProductByIdService,
} from "../services/product.service";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await getAllProductsService();
  res.json(products);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.productId;
  const product = await getProductByIdService(productId);
  if (!product) {
    res.status(404).json({ error: "Product not found." });
    return;
  }
  res.json(product);
};
