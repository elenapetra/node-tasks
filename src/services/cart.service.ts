import { CartEntity } from "../utils/types";
import {
  deleteCartObject,
  getCartObject,
  updateCartObject,
} from "../repositories/cart.repository";

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  const userCart = await getCartObject(userId);
  return userCart;
};

export const updateCart = async (
  userId: string,
  updatedItems: CartEntity["items"]
): Promise<void> => {
  try {
    const existingCart = await getCartObject(userId);
    if (!existingCart) {
      console.error("Cart not found for user:", userId);
      return;
    }
    existingCart.items = updatedItems;
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
