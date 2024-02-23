import { saveOrderObject } from "../repositories/order.repository";
import { OrderEntity } from "../utils/types";
import { getActiveCartObject } from "../repositories/cart.repository";
import { logger } from "../utils/logger";

export const createOrder = async (userId: string) => {
  try {
    const userCart = await getActiveCartObject(userId);
    return userCart;
  } catch (error) {
    logger.error("Error creating order:", error);
  }
};

export const saveOrder = async (order: OrderEntity) => {
  try {
    await saveOrderObject(order);
  } catch (error) {
    logger.error("Error saving order:", error);
  }
};
