import { saveOrder } from "../repositories/order.repository";
import { OrderEntity } from "../utils/types";
import { checkoutCart } from "../repositories/cart.repository";

export const checkoutOrderService = async (userId: string) => {
  const userCart = await checkoutCart(userId);
  return userCart;
};

export const saveOrderService = async (order: OrderEntity) => {
  try {
    await saveOrder(order);
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Error saving order");
  }
};
