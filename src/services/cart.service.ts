import { CartEntity } from "../utils/types";
import {
  deleteCart,
  getCart,
  updateCart,
} from "../repositories/cart.repository";

export const getCartService = async (
  userId: string
): Promise<CartEntity | undefined> => {
  const userCart = await getCart(userId);
  return userCart;
};

export const updateCartService = async (
  userId: string,
  updatedItems: CartEntity["items"]
): Promise<void> => {
  try {
    const existingCart = await getCart(userId);
    if (!existingCart) {
      console.error("Cart not found for user:", userId);
      return;
    }
    existingCart.items = updatedItems;
    await updateCart(userId, { items: existingCart.items });
  } catch (error) {
    console.error("Error updating cart:", error);
    throw new Error("Internal Server Error");
  }
};

export const deleteCartService = async (userId: string): Promise<void> => {
  const deletedCart = await deleteCart(userId);
  return deletedCart;
};
