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
exports.checkoutCartService = exports.deleteCartService = exports.updateCartService = exports.getCartService = void 0;
const cart_repository_1 = require("../repositories/cart.repository");
const getCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield (0, cart_repository_1.getCart)(userId);
    return userCart;
});
exports.getCartService = getCartService;
const updateCartService = (userId, updatedCart) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, cart_repository_1.updateCart)(userId, updatedCart);
});
exports.updateCartService = updateCartService;
const deleteCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCart = yield (0, cart_repository_1.deleteCart)(userId);
    return deletedCart;
});
exports.deleteCartService = deleteCartService;
const checkoutCartService = (userId) => {
    return;
};
exports.checkoutCartService = checkoutCartService;
