import { Request, Response } from "express";
import { getProductsList, getProductById } from "../services/product.service";
import { logger } from "../utils/logger";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getProductsList();
    const responseBody = {
      data: Object.values(products),
      error: null,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    logger.error("Error getting products: ", error);
    res.status(500).json({
      data: null,
      error: {
        message: "Internal Server error",
      },
    });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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
    res.status(200).json(responseBody);
  } catch (error) {
    logger.error("Error getting product: ", error);
    res.status(500).json({
      data: null,
      error: {
        message: "Internal Server error",
      },
    });
  }
};
