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
exports.deleteCart = exports.updateCart = exports.getCart = void 0;
const cart_repository_1 = require("../repositories/cart.repository");
const product_service_1 = require("./product.service");
const getCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCart = yield (0, cart_repository_1.getCartObject)(userId);
        return userCart;
    }
    catch (error) {
        console.error("Cart not found for user:", userId);
    }
});
exports.getCart = getCart;
const updateCart = (userId, itemToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCart = yield (0, cart_repository_1.getCartObject)(userId);
        if (!existingCart) {
            console.error("Cart not found for user:", userId);
            return;
        }
        const { product, count } = itemToUpdate;
        if (count === 0) {
            return;
        }
        const existingItem = existingCart.items.find((item) => item.product._id.equals(product._id));
        if (existingItem) {
            existingItem.count += count;
        }
        else {
            const productDetails = yield (0, product_service_1.getProductById)(product._id);
            if (!productDetails) {
                console.error("Product not found in the database for updateItem:", itemToUpdate);
                return;
            }
            existingCart.items.push({
                product: productDetails,
                count,
            });
        }
        yield (0, cart_repository_1.updateCartObject)(userId, { items: existingCart.items });
    }
    catch (error) {
        console.error("Error updating cart:", error);
    }
});
exports.updateCart = updateCart;
const deleteCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCart = yield (0, cart_repository_1.deleteCartObject)(userId);
        return deletedCart;
    }
    catch (error) {
        console.error("Error deleting cart:", error);
    }
});
exports.deleteCart = deleteCart;
