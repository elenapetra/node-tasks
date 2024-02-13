import { CartEntity } from "../utils/types";
import { CartModel } from "../models/schemas/cart.model";

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  try {
    let userCart = await CartModel.findOne({
      userId: userId,
      isDeleted: false,
    });
    if (!userCart) {
      const existingDeletedCart = await CartModel.findOneAndUpdate(
        { userId: userId, isDeleted: true },
        { $set: { isDeleted: false } },
        { new: true }
      );
      if (existingDeletedCart) {
        return existingDeletedCart.toObject();
      }
      const newCart = new CartModel({
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
    const cartToUpdate = await CartModel.findOneAndUpdate(
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

export const deleteCart = async (userId: string): Promise<void> => {
  try {
    const existingDeletedCart = await CartModel.findOne({
      userId: userId,
      isDeleted: true,
    });
    if (existingDeletedCart) {
      await CartModel.deleteOne({ _id: existingDeletedCart._id });
      console.log("Existing deleted cart removed successfully");
    }
    const deletedCart = await CartModel.findOneAndUpdate(
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
