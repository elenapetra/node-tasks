import { CartItemEntity, ORDER_STATUS, OrderEntity } from "../utils/types";
const uuid = require("uuid");

const newId = uuid.v4();
const orders: OrderEntity[] = [];

export const getUserOrdersService = (userId: string): OrderEntity[] => {
  return orders.filter((order) => order.userId === userId);
};

export const createOrderService = (
  userId: string,
  cartId: string,
  items: CartItemEntity[]
): OrderEntity => {
  const order: OrderEntity = {
    id: newId,
    userId: userId,
    cartId: cartId,
    items: items,
    payment: { type: "paypal" },
    delivery: { type: "post", address: {} },
    comments: "",
    status: "created" as ORDER_STATUS,
    total: 2,
  };
  orders.push(order);
  return order;
};
