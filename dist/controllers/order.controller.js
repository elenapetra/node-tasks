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
exports.createUserOrder = void 0;
const order_service_1 = require("../services/order.service");
const order_repository_1 = require("../repositories/order.repository");
const uuid = require("uuid");
const createUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log(userId);
        if (!userId) {
            res.status(401).json({
                data: null,
                error: { message: "You must be an authorized user" },
            });
            return;
        }
        const userCart = yield (0, order_service_1.createOrder)(userId);
        if (!userCart) {
            console.error("User cart was not found");
            return;
        }
        if (userCart.items.length === 0) {
            res.status(400).json({ data: null, error: { message: "Cart is empty" } });
            return;
        }
        const userOrder = {
            id: uuid.v4(),
            userId: userId,
            cartId: userCart.id,
            items: userCart.items,
            payment: { type: "paypal" },
            delivery: { type: "post", address: {} },
            comments: "",
            status: "created",
            total: userCart.items.reduce((acc, item) => acc + item.product.price * item.count, 0),
        };
        yield (0, order_repository_1.saveOrderObject)(userOrder);
        const responseBody = {
            data: { userOrder },
            error: null,
        };
        res.status(200).json(responseBody);
    }
    catch (error) {
        console.error("Error creating user orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createUserOrder = createUserOrder;
