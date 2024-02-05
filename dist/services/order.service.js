"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = exports.getUserOrdersService = void 0;
const uuid = require("uuid");
const newId = uuid.v4();
const orders = [];
const getUserOrdersService = (userId) => {
    return orders.filter((order) => order.userId === userId);
};
exports.getUserOrdersService = getUserOrdersService;
const createOrderService = (userId, cartId, items) => {
    const order = {
        id: newId,
        userId: userId,
        cartId: cartId,
        items: items,
        payment: { type: "paypal" },
        delivery: { type: "post", address: {} },
        comments: "",
        status: "created",
        total: 2,
    };
    orders.push(order);
    return order;
};
exports.createOrderService = createOrderService;
