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
exports.updateOrder = exports.deleteUserOrder = exports.createOrder = exports.getUserOrder = exports.getAllOrders = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, "data", "orders.json");
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(dataFilePath, "utf-8");
        return JSON.parse(data) || [];
    }
    catch (error) {
        console.error("Error reading products data:", error);
        return [];
    }
});
exports.getAllOrders = getAllOrders;
const getUserOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, exports.getAllOrders)();
    const userOrders = orders.filter((order) => order.id === userId);
    return userOrders;
});
exports.getUserOrder = getUserOrder;
const createOrder = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, exports.getAllOrders)();
    orders.push(item);
    yield promises_1.default.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
});
exports.createOrder = createOrder;
const deleteUserOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, exports.getAllOrders)();
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
        orders.slice(orderIndex, 1);
        yield promises_1.default.writeFile(dataFilePath, JSON.stringify(orders, null, 2), "utf-8");
    }
});
exports.deleteUserOrder = deleteUserOrder;
const updateOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, exports.getAllOrders)();
    const orderToUpdate = orders.find((order) => order.id === orderId);
    if (!orderToUpdate) {
        throw new Error(`Order with ID ${orderId} not found.`);
    }
});
exports.updateOrder = updateOrder;
