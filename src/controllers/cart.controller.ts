import { Response } from "express";
import { getCart, updateCart, deleteCart } from "../services/cart.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { getProductObject } from "../repositories/product.repository";
import Joi from "joi";

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
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "User is not authorized" },
      });
      return;
    }
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
          message: "Products are not valid",
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
        error: {
          message: "Cart was not found",
        },
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

    const itemToUpdate = {
      product: retrievedProduct,
      count: count,
    };

    await updateCart(userId, itemToUpdate);

    const updatedUserCart = await getCart(userId);

    if (!updatedUserCart) {
      res.status(500).json({
        data: null,
        error: {
          message: "Failed to update user cart",
        },
      });
      return;
    }

    const currentProduct = updatedUserCart.items.find((item) => {
      return item.product._id.toString() === productId;
    });

    if (currentProduct) {
      const data = {
        cart: {
          id: userCart._id,
          items: [
            {
              product: {
                id: currentProduct.product._id.toString(),
                title: currentProduct.product.title,
                description: currentProduct.product.description,
                price: currentProduct.product.price,
              },
              count: count,
            },
          ],
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
