import { Response } from "express";
import { getCart, updateCart, deleteCart } from "../services/cart.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { getProductObject } from "../repositories/product.repository";
import Joi from "joi";
import { CartItemEntity } from "../utils/types";

export const getUserCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
      return;
    }
    const userCart = await getCart(userId);
    if (!userCart) {
      res
        .status(404)
        .json({ data: null, error: { message: "Cart not found." } });
      return;
    }
    const total = userCart.items.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );

    const responseData = {
      data: {
        cart: userCart,
        total: total,
      },
      error: null,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res
      .status(500)
      .json({ data: null, error: { message: "Internal Server Error" } });
  }
};

export const deleteUserCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      data: null,
      error: { message: "User is not authorized" },
    });
    return;
  }

  try {
    await deleteCart(userId);
    res.status(200).json({ data: { success: true }, error: null });
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
};

export const updateUserCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    const orderSchema = Joi.object({
      productId: Joi.string().required(),
      count: Joi.number().integer().min(0).required(),
    });

    const { error, value } = orderSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        data: null,
        error: {
          message: "Validation Error",
          details: error.details.map((detail) => detail.message),
        },
      });
      return;
    }

    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
      return;
    }

    const userCart = await getCart(userId);
    const { productId, count } = value;

    if (!userCart) {
      res.status(404).json({
        data: null,
        error: { message: "Cart was not found" },
      });
      return;
    }

    const retrievedProduct = await getProductObject(productId);

    if (!retrievedProduct) {
      res.status(404).json({
        data: null,
        error: {
          message: "Product not found",
        },
      });
      return;
    }

    const itemToUpdate: CartItemEntity = {
      product: retrievedProduct,
      count: count,
    };

    await updateCart(userId, itemToUpdate);

    const currentProduct = userCart.items.find(
      (item) => item.product.id === productId
    );

    if (currentProduct) {
      const data = {
        cart: {
          id: userCart.id,
          items: [currentProduct],
        },
        total: count * currentProduct.product.price,
      };

      const responseBody = {
        data,
        error: null,
      };
      res.status(200).json(responseBody);
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
    });
  }
};
