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
exports.saveOrderService = exports.checkoutOrderService = void 0;
const order_repository_1 = require("../repositories/order.repository");
const cart_repository_1 = require("../repositories/cart.repository");
const checkoutOrderService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield (0, cart_repository_1.checkoutCart)(userId);
    return userCart;
});
exports.checkoutOrderService = checkoutOrderService;
const saveOrderService = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_repository_1.saveOrder)(order);
    }
    catch (error) {
        console.error("Error saving order:", error);
        throw new Error("Error saving order");
    }
});
exports.saveOrderService = saveOrderService;
