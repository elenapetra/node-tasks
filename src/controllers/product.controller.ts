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
  const responseBody = {
    data: { ...products },
    error: null,
  };
  res.json(responseBody);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.productId;
  const product = await getProductByIdService(productId);
  if (!product) {
    res
      .status(404)
      .json({ data: null, error: { message: "No product with such id" } });
    return;
  }
  const responseBody = {
    data: { ...product },
    error: null,
  };
  res.json(responseBody);
};
