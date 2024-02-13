import { CartEntity } from "../utils/types";
import {
  deleteCart,
  getCart,
  updateCart,
} from "../repositories/cart.repository";
import { CartItemEntity } from "../utils/types";
import { getProductByIdService } from "./product.service";

export const getCartService = async (
  userId: string
): Promise<CartEntity | undefined> => {
  const userCart = await getCart(userId);
  return userCart;
};

export const updateCartService = async (
  userId: string,
  itemToUpdate: CartItemEntity
): Promise<void> => {
  try {
    const existingCart = await getCart(userId);

    if (!existingCart) {
      console.error("Cart not found for user:", userId);
      return;
    }
    const { product, count } = itemToUpdate;
    if (count === 0) {
      existingCart.items = existingCart.items.filter(
        (item) => !item.product._id.equals(product._id)
      );
    } else {
      const existingItemIndex = existingCart.items.findIndex((item) =>
        item.product._id.equals(product._id)
      );
      if (existingItemIndex !== -1) {
        existingCart.items[existingItemIndex].count += count;
      } else {
        const productDetails = await getProductByIdService(product._id);
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
