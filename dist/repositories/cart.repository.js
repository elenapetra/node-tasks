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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveCartObject = exports.deleteCartObject = exports.updateCartObject = exports.getCartObject = exports.getAllCarts = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const uuid = require("uuid");
const dataFilePath = "src/data/carts.json";
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(dataFilePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error reading users data:", error);
        return [];
    }
});
exports.getAllCarts = getAllCarts;
const getCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield (0, exports.getAllCarts)();
        let userCart = carts.find((cart) => cart.userId === userId && !cart.isDeleted);
        if (!userCart) {
            userCart = {
                id: uuid.v4(),
                userId: userId,
                isDeleted: false,
                items: [],
            };
            carts.push(userCart);
            yield promises_1.default.writeFile(dataFilePath, JSON.stringify(carts, null, 2));
        }
        return userCart;
    }
    catch (error) {
        console.error("Error reading carts data:", error);
        return undefined;
    }
});
exports.getCartObject = getCartObject;
const updateCartObject = (userId, updatedCart) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield (0, exports.getAllCarts)();
    const updatedCartList = carts.map((cart) => {
        if (cart.userId === userId && !cart.isDeleted) {
            return Object.assign(Object.assign({}, cart), { items: updatedCart.items });
        }
        return cart;
    });
    yield promises_1.default.writeFile(dataFilePath, JSON.stringify(updatedCartList, null, 2), "utf-8");
});
exports.updateCartObject = updateCartObject;
const deleteCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield (0, exports.getAllCarts)();
    const updatedCartList = carts.map((cart) => {
        if (cart.userId === userId && !cart.isDeleted) {
            return Object.assign(Object.assign({}, cart), { items: [], isDeleted: true });
        }
        return cart;
    });
    yield promises_1.default.writeFile(dataFilePath, JSON.stringify(updatedCartList, null, 2), "utf-8");
});
exports.deleteCartObject = deleteCartObject;
const getActiveCartObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield (0, exports.getAllCarts)();
    const userCart = carts.find((cart) => cart.userId === userId && !cart.isDeleted);
    return userCart;
});
exports.getActiveCartObject = getActiveCartObject;
