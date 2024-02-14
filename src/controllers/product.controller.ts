import { Request, Response } from "express";
import { getProductsList, getProductById } from "../services/product.service";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await getProductsList();
  const responseBody = {
    data: { ...products },
    error: null,
  };
  res.json(responseBody);
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.productId;
  const product = await getProductById(productId);
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
