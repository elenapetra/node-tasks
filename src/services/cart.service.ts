import { CartEntity } from "../utils/types";
import {
  deleteCartObject,
  getCartObject,
  updateCartObject,
} from "../repositories/cart.repository";
import { CartItemEntity } from "../utils/types";
import { getProductById } from "./product.service";
import { logger } from "../utils/logger";

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  try {
    const userCart = await getCartObject(userId);
    return userCart;
  } catch (error) {
    logger.error("Cart not found for user:", userId);
  }
};

export const updateCart = async (
  userId: string,
  itemToUpdate: CartItemEntity
): Promise<void> => {
  try {
    const existingCart = await getCartObject(userId);

    if (!existingCart) {
      logger.error("Cart not found for user:", userId);
      return;
    }

    const { product, count } = itemToUpdate;

    const existingItem = existingCart.items.find((item) =>
      item.product._id.equals(product._id)
    );

    if (existingItem) {
      existingItem.count += count;
    } else {
      const productDetails = await getProductById(product._id);

      if (!productDetails) {
        logger.error(
          "Product not found in the database for updateItem:",
          itemToUpdate
        );
        return;
      }

      existingCart.items.push({
        product: productDetails,
        count,
      });
    }

    await updateCartObject(userId, { items: existingCart.items });
  } catch (error) {
    logger.error("Error updating cart:", error);
  }
};

export const deleteCart = async (userId: string): Promise<void> => {
  try {
    const deletedCart = await deleteCartObject(userId);
    return deletedCart;
  } catch (error) {
    logger.error("Error deleting cart:", error);
  }
};
