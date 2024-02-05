import { OrderEntity } from "../utils/types";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(__dirname, "data", "orders.json");

export const getAllOrders = async (): Promise<OrderEntity[]> => {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading products data:", error);
    return [];
  }
};

export const getUserOrder = async (userId: string): Promise<OrderEntity[]> => {
  const orders = await getAllOrders();
  const userOrders = orders.filter((order) => order.id === userId);
  return userOrders;
};

export const createOrder = async (item: OrderEntity): Promise<void> => {
  const orders = await getAllOrders();
  orders.push(item);
  await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
};

export const deleteUserOrder = async (orderId: string): Promise<void> => {
  const orders = await getAllOrders();
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  if (orderIndex !== -1) {
    orders.slice(orderIndex, 1);
    await fs.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
  }
};

export const updateOrder = async (orderId: string): Promise<void> => {
  const orders = await getAllOrders();
  const orderToUpdate = orders.find((order) => order.id === orderId);

  if (!orderToUpdate) {
    throw new Error(`Order with ID ${orderId} not found.`);
  }
};
