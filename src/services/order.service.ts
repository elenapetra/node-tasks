import { saveOrderObject } from "../repositories/order.repository";
import { OrderEntity } from "../utils/types";
import { getActiveCartObject } from "../repositories/cart.repository";

export const createOrder = async (userId: string) => {
  const userCart = await getActiveCartObject(userId);
  return userCart;
};

export const saveOrder = async (order: OrderEntity) => {
  try {
    await saveOrderObject(order);
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Error saving order");
  }
};
