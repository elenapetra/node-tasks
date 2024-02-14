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
exports.getActiveCartObject = exports.deleteCartObject = exports.updateCartObject = exports.getCartObject = void 0;
const cart_model_1 = require("../models/schemas/cart.model");
const getCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userCart = yield cart_model_1.CartModel.findOne({
            userId: userId,
            isDeleted: false,
        });
        if (!userCart) {
            const existingDeletedCart = yield cart_model_1.CartModel.findOneAndUpdate({ userId: userId, isDeleted: true }, { $set: { isDeleted: false } }, { new: true });
            if (existingDeletedCart) {
                return existingDeletedCart.toObject();
            }
            const newCart = new cart_model_1.CartModel({
                userId: userId,
                isDeleted: false,
                items: [],
            });
            yield newCart.save();
            return newCart.toObject();
        }
        return userCart.toObject();
    }
    catch (error) {
        console.error("Error getting cart data:", error);
        return undefined;
    }
});
exports.getCartObject = getCartObject;
const updateCartObject = (userId, updatedCart) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartToUpdate = yield cart_model_1.CartModel.findOneAndUpdate({ userId: userId, isDeleted: false }, { $set: { items: updatedCart.items } }, { new: true });
        if (!cartToUpdate) {
            console.error("User's cart not found or is deleted.");
            return;
        }
    }
    catch (error) {
        console.error("Error updating cart data: ", error);
    }
});
exports.updateCartObject = updateCartObject;
const deleteCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingDeletedCart = yield cart_model_1.CartModel.findOne({
            userId: userId,
            isDeleted: true,
        });
        if (existingDeletedCart) {
            yield cart_model_1.CartModel.deleteOne({ _id: existingDeletedCart._id });
        }
        const deletedCart = yield cart_model_1.CartModel.findOneAndUpdate({ userId: userId, isDeleted: false }, { $set: { items: [], isDeleted: true } }, { new: true });
        if (!deletedCart) {
            console.error("User's cart not found or is already deleted.");
            return;
        }
    }
    catch (error) {
        console.error("Error deleting cart data:", error);
    }
});
exports.deleteCartObject = deleteCartObject;
const getActiveCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCart = yield cart_model_1.CartModel.findOne({
            userId: userId,
            isDeleted: false,
        });
        if (!userCart) {
            console.error("User's cart not found");
            return undefined;
        }
        return userCart.toObject();
    }
    catch (error) {
        console.error("Error checking out cart data:", error);
        return undefined;
    }
});
exports.getActiveCartObject = getActiveCartObject;
