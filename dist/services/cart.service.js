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
exports.deleteCartService = exports.updateCartService = exports.getCartService = void 0;
const cart_repository_1 = require("../repositories/cart.repository");
const product_service_1 = require("./product.service");
const getCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userCart = yield (0, cart_repository_1.getCart)(userId);
    return userCart;
});
exports.getCartService = getCartService;
const updateCartService = (userId, itemToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCart = yield (0, cart_repository_1.getCart)(userId);
        if (!existingCart) {
            console.error("Cart not found for user:", userId);
            return;
        }
        const { product, count } = itemToUpdate;
        if (count === 0) {
            existingCart.items = existingCart.items.filter((item) => !item.product._id.equals(product._id));
        }
        else {
            const existingItemIndex = existingCart.items.findIndex((item) => item.product._id.equals(product._id));
            if (existingItemIndex !== -1) {
                existingCart.items[existingItemIndex].count += count;
            }
            else {
                const productDetails = yield (0, product_service_1.getProductByIdService)(product._id);
                if (productDetails) {
                    existingCart.items.push({
                        product: productDetails,
                        count,
                    });
                }
                else {
                    console.error("Product not found in the database for updateItem:", itemToUpdate);
                }
            }
        }
        yield (0, cart_repository_1.updateCart)(userId, { items: existingCart.items });
    }
    catch (error) {
        console.error("Error updating cart:", error);
        throw new Error("Internal Server Error");
    }
});
exports.updateCartService = updateCartService;
const deleteCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCart = yield (0, cart_repository_1.deleteCart)(userId);
    return deletedCart;
});
exports.deleteCartService = deleteCartService;
