import { CartEntity } from "../utils/types";
import CartModel from "../models/schemas/cart.model";
import fs from "fs/promises";
const uuid = require("uuid");

const dataFilePath = "src/data/carts.json";

// export const getCart = async (
//   userId: string
// ): Promise<CartEntity | undefined> => {
//   try {
//     const carts = await getAllCarts();
//     let userCart = carts.find(
//       (cart: CartEntity) => cart.userId === userId && !cart.isDeleted
//     );
//     if (!userCart) {
//       userCart = {
//         id: uuid.v4(),
//         userId: userId,
//         isDeleted: false,
//         items: [],
//       };
//       carts.push(userCart);
//       await fs.writeFile(dataFilePath, JSON.stringify(carts, null, 2));
//     }
//     return userCart;
//   } catch (error) {
//     console.error("Error reading carts data:", error);
//     return undefined;
//   }
// };

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  try {
    const userCart = await CartModel.findOne({
      userId: userId,
      isDeleted: false,
    });

    if (!userCart) {
      const newCart = new CartModel({
        id: uuid.v4(),
        userId: userId,
        isDeleted: false,
        items: [],
      });
      await newCart.save();
      return newCart.toObject();
    }
    return userCart.toObject();
  } catch (error) {
    console.error("Error getting cart data:", error);
    return undefined;
  }
};

// export const updateCart = async (
//   userId: string,
//   updatedCart: { items: CartEntity["items"] }
// ): Promise<void> => {
//   const carts = await getAllCarts();
//   const updatedCartList = carts.map((cart: CartEntity) => {
//     if (cart.userId === userId && !cart.isDeleted) {
//       return { ...cart, items: updatedCart.items };
//     }
//     return cart;
//   });
//   await fs.writeFile(
//     dataFilePath,
//     JSON.stringify(updatedCartList, null, 2),
//     "utf-8"
//   );
// };

export const updateCart = async (
  userId: string,
  updatedCart: { items: CartEntity["items"] }
): Promise<void> => {
  try {
    const cartToUpdate = await CartModel.findByIdAndUpdate(
      { userId: userId, isDeleted: false },
      { $set: { items: updatedCart.items } },
      { new: true }
    );
    if (!cartToUpdate) {
      console.error("User's cart not found or is deleted.");
      return;
    }
    console.log("Cart updated successfully: ", cartToUpdate);
  } catch (error) {
    console.error("Error updating cart data: ", error);
  }
};

// export const deleteCart = async (userId: string): Promise<void> => {
//   const carts = await getAllCarts();
//   const updatedCartList = carts.map((cart: CartEntity) => {
//     if (cart.userId === userId && !cart.isDeleted) {
//       return { ...cart, items: [], isDeleted: true };
//     }
//     return cart;
//   });
//   await fs.writeFile(
//     dataFilePath,
//     JSON.stringify(updatedCartList, null, 2),
//     "utf-8"
//   );
// };

export const deleteCart = async (userId: string): Promise<void> => {
  try {
    const deletedCart = await CartModel.findByIdAndUpdate(
      { userId: userId, isDeleted: false },
      { $set: { items: [], isDeleted: true } },
      { new: true }
    );
    if (!deletedCart) {
      console.error("User's cart not found or is already deleted.");
      return;
    }
    console.log("Cart deleted successfully: ", deleteCart);
  } catch (error) {
    console.error("Error deleting cart data:", error);
  }
};

// export const checkoutCart = async (
//   userId: string
// ): Promise<CartEntity | undefined> => {
//   const carts = await getAllCarts();
//   const userCart = carts.find(
//     (cart) => cart.userId === userId && !cart.isDeleted
//   );
//   return userCart;
// };
export const checkoutCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  try {
    const userCart = await CartModel.findOne({
      userId: userId,
      isDeleted: false,
    });
    if (!userCart) {
      console.error("User's cart not found or is deleted.");
      return undefined;
    }
    console.log("Cart checked out successfully:", userCart);
    return userCart.toObject();
  } catch (error) {
    console.error("Error checking out cart data:", error);
    return undefined;
  }
};
