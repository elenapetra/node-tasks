import { OrderEntity } from "../utils/types";
import { OrderModel } from "../models/schemas/order.model";

export const getOrderObject = async (
  userId: string
): Promise<OrderEntity[]> => {
  try {
    const order = await OrderModel.find({ userId });
    return order;
  } catch (error) {
    console.error("Error fetching user orders from MongoDB:", error);
    return [];
  }
};

export const saveOrderObject = async (order: OrderEntity): Promise<void> => {
  try {
    await OrderModel.create(order);
  } catch (error) {
    console.error("Error saving order to MongoDB:", error);
  }
};
