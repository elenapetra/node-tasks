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
  updatedCart: Partial<CartEntity>
): Promise<void> => {
  return updateCart(userId, updatedCart);
};

export const deleteCartService = async (userId: string): Promise<void> => {
  const deletedCart = await deleteCart(userId);
  return deletedCart;
};

export const checkoutCartService = (userId: string): void => {
  return;
};
