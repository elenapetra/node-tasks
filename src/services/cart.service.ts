import { CartEntity, CartItemEntity } from "../utils/types";
import {
  deleteCartObject,
  getCartObject,
  updateCartObject,
} from "../repositories/cart.repository";
import { getProductById } from "./product.service";

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  const userCart = await getCartObject(userId);
  return userCart;
};

export const updateCart = async (
  userId: string,
  itemToUpdate: CartItemEntity
): Promise<void> => {
  try {
    const existingCart = await getCartObject(userId);
    if (!existingCart) {
      console.error("Cart not found for user:", userId);
      return;
    }

    const { product, count } = itemToUpdate;

    if (count === 0) {
      return;
    } else {
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        existingCart.items[existingItemIndex].count += count;
      } else {
        const productDetails = await getProductById(product.id);
        if (productDetails) {
          existingCart.items.push({
            product: productDetails,
            count,
          });
        } else {
          console.error(
            "Product not found in the database for updateItem:",
            itemToUpdate
          );
        }
      }
    }

    await updateCartObject(userId, { items: existingCart.items });
  } catch (error) {
    console.error("Error updating cart:", error);
    throw new Error("Internal Server Error");
  }
};

export const deleteCart = async (userId: string): Promise<void> => {
  const deletedCart = await deleteCartObject(userId);
  return deletedCart;
};
