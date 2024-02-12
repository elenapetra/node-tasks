import { OrderEntity } from "../utils/types";
import fs from "fs/promises";

const dataFilePath = "src/data/orders.json";

export const getAllOrders = async (): Promise<OrderEntity[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products data:", error);
    return [];
  }
};

export const getUserOrder = async (userId: string): Promise<OrderEntity[]> => {
  const orders = await getAllOrders();
  const userOrders = orders.filter((order) => order._id.toString() === userId);
  return userOrders;
};

export const saveOrder = async (order: OrderEntity): Promise<void> => {
  const orders = await getAllOrders();
  orders.push(order);
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
};
