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
exports.saveOrderObject = exports.getOrderObject = void 0;
const order_model_1 = require("../models/schemas/order.model");
const getOrderObject = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.OrderModel.find({ userId });
        return order;
    }
    catch (error) {
        console.error("Error fetching user orders from MongoDB:", error);
        return [];
    }
});
exports.getOrderObject = getOrderObject;
const saveOrderObject = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_model_1.OrderModel.create(order);
    }
    catch (error) {
        console.error("Error saving order to MongoDB:", error);
    }
});
exports.saveOrderObject = saveOrderObject;
