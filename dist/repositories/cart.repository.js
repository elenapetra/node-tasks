"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = exports.deleteCart = exports.updateCart = exports.getCart = void 0;
const CartModel = require("../models/schemas/cart.model");
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
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCart = yield CartModel.findOne({
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
            yield newCart.save();
            return newCart.toObject();
        }
        return userCart.toObject();
    }
    catch (error) {
        console.error("Error getting cart data:", error);
        return undefined;
    }
});
exports.getCart = getCart;
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
const updateCart = (userId, updatedCart) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartToUpdate = yield CartModel.findByIdAndUpdate({ userId: userId, isDeleted: false }, { $set: { items: updatedCart.items } }, { new: true });
        if (!cartToUpdate) {
            console.error("User's cart not found or is deleted.");
            return;
        }
        console.log("Cart updated successfully: ", cartToUpdate);
    }
    catch (error) {
        console.error("Error updating cart data: ", error);
    }
});
exports.updateCart = updateCart;
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
const deleteCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCart = yield CartModel.findByIdAndUpdate({ userId: userId, isDeleted: false }, { $set: { items: [], isDeleted: true } }, { new: true });
        if (!deletedCart) {
            console.error("User's cart not found or is already deleted.");
            return;
        }
        console.log("Cart deleted successfully: ", exports.deleteCart);
    }
    catch (error) {
        console.error("Error deleting cart data:", error);
    }
});
exports.deleteCart = deleteCart;
// export const checkoutCart = async (
//   userId: string
// ): Promise<CartEntity | undefined> => {
//   const carts = await getAllCarts();
//   const userCart = carts.find(
//     (cart) => cart.userId === userId && !cart.isDeleted
//   );
//   return userCart;
// };
const checkoutCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCart = yield CartModel.findOne({
            userId: userId,
            isDeleted: false,
        });
        if (!userCart) {
            console.error("User's cart not found or is deleted.");
            return undefined;
        }
        console.log("Cart checked out successfully:", userCart);
        return userCart.toObject();
    }
    catch (error) {
        console.error("Error checking out cart data:", error);
        return undefined;
    }
});
exports.checkoutCart = checkoutCart;
