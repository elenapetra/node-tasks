import { CartEntity } from "../utils/types";
import fs from "fs/promises";
const uuid = require("uuid");

const dataFilePath = "src/data/carts.json";

export const getAllCarts = async (): Promise<CartEntity[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users data:", error);
    return [];
  }
};

export const getCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  try {
    const carts = await getAllCarts();
    let userCart = carts.find(
      (cart: CartEntity) => cart.userId === userId && !cart.isDeleted
    );
    if (!userCart) {
      userCart = {
        id: uuid.v4(),
        userId: userId,
        isDeleted: false,
        items: [],
      };
      carts.push(userCart);
      await fs.writeFile(dataFilePath, JSON.stringify(carts, null, 2));
    }
    return userCart;
  } catch (error) {
    console.error("Error reading carts data:", error);
    return undefined;
  }
};

export const updateCart = async (
  userId: string,
  updatedCart: { items: CartEntity["items"] }
): Promise<void> => {
  const carts = await getAllCarts();
  const updatedCartList = carts.map((cart: CartEntity) => {
    if (cart.userId === userId && !cart.isDeleted) {
      return { ...cart, items: updatedCart.items };
    }
    return cart;
  });
  await fs.writeFile(
    dataFilePath,
    JSON.stringify(updatedCartList, null, 2),
    "utf-8"
  );
};

export const deleteCart = async (userId: string): Promise<void> => {
  const carts = await getAllCarts();
  const updatedCartList = carts.map((cart: CartEntity) => {
    if (cart.userId === userId && !cart.isDeleted) {
      return { ...cart, items: [], isDeleted: true };
    }
    return cart;
  });
  await fs.writeFile(
    dataFilePath,
    JSON.stringify(updatedCartList, null, 2),
    "utf-8"
  );
};

export const checkoutCart = async (
  userId: string
): Promise<CartEntity | undefined> => {
  const carts = await getAllCarts();
  const userCart = carts.find(
    (cart) => cart.userId === userId && !cart.isDeleted
  );
  return userCart;
};
