import { Request, Response } from "express";
import {
  getCartService,
  updateCartService,
  deleteCartService,
} from "../services/cart.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { getProductById } from "../repositories/product.repository";
import Joi from "joi";

export const getUserCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    if (userId) {
      const userCart = await getCartService(userId);
      if (userCart) {
        const responseData = {
          data: {
            cart: {
              id: userCart.id,
              items: userCart.items.map((item) => ({
                product: {
                  id: item.product.id,
                  title: item.product.title,
                  description: item.product.description,
                  price: item.product.price,
                },
                count: item.count,
              })),
            },
            total: userCart.items.reduce(
              (total, item) => total + item.product.price * item.count,
              0
            ),
          },
          error: null,
        };

        res.status(200).json(responseData);
      } else {
        res
          .status(404)
          .json({ data: null, error: { message: "Cart not found." } });
      }
    } else {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ data: null, error: { message: "Internal Server Error" } });
  }
};

export const deleteCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    if (userId) {
      await deleteCartService(userId);
      res.status(200).json({ data: { success: true }, error: null });
    } else {
      res
        .status(401)
        .json({ data: null, error: { message: "User is not authorized" } });
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
};

export const updateCart = async (
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

    const userCart = await getCartService(userId);
    const { productId, count } = value;

    if (!userCart) {
      res.status(404).json({
        data: null,
        error: {
          message: "Cart was not found",
        },
      });
      return;
    }

    let updatedItems = [];
    if (count === 0) {
      updatedItems = userCart.items.filter(
        (item) => item.product.id !== productId
      );
    } else {
      updatedItems = userCart.items.map((item) => {
        if (item.product.id === productId) {
          return { ...item, count };
        } else {
          return item;
        }
      });
    }

    if (!userCart.items.some((item) => item.product.id === productId)) {
      const productDetails = await getProductById(productId);
      if (!productDetails) {
        res.status(400).json({
          data: null,
          error: { message: "Products are not valid" },
        });
        return;
      }
      updatedItems.push({ product: productDetails, count });
    }

    updatedItems = updatedItems.filter((item) => item.count > 0);
    await updateCartService(userId, updatedItems);
    const currentProduct = userCart.items.find((item) => {
      return item.product.id === productId;
    });
    if (currentProduct) {
      const data = {
        cart: {
          id: userCart.id,
          items: [currentProduct],
        },
        total: count * currentProduct?.product.price,
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
