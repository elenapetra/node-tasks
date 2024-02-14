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
exports.saveOrder = exports.createOrder = void 0;
const order_repository_1 = require("../repositories/order.repository");
const cart_repository_1 = require("../repositories/cart.repository");
const createOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCart = yield (0, cart_repository_1.getActiveCartObject)(userId);
        return userCart;
    }
    catch (error) {
        console.error("Error creating order:", error);
    }
});
exports.createOrder = createOrder;
const saveOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_repository_1.saveOrderObject)(order);
    }
    catch (error) {
        console.error("Error saving order:", error);
    }
});
exports.saveOrder = saveOrder;
