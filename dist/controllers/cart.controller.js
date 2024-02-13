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
exports.updateCart = exports.deleteCart = exports.getUserCart = void 0;
const cart_service_1 = require("../services/cart.service");
const product_repository_1 = require("../repositories/product.repository");
const joi_1 = __importDefault(require("joi"));
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (userId) {
            const userCart = yield (0, cart_service_1.getCartService)(userId);
            if (userCart) {
                const responseData = {
                    data: {
                        cart: userCart,
                        total: userCart.items.reduce((total, item) => total + item.product.price * item.count, 0),
                    },
                    error: null,
                };
                res.status(200).json(responseData);
            }
            else {
                res
                    .status(404)
                    .json({ data: null, error: { message: "Cart not found." } });
            }
        }
        else {
            res.status(401).json({
                data: null,
                error: { message: "You must be an authorized user" },
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ data: null, error: { message: "Internal Server Error" } });
    }
});
exports.getUserCart = getUserCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (userId) {
            yield (0, cart_service_1.deleteCartService)(userId);
            res.status(200).json({ data: { success: true }, error: null });
        }
        else {
            res
                .status(401)
                .json({ data: null, error: { message: "User is not authorized" } });
        }
    }
    catch (error) {
        console.error("Error deleting cart:", error);
    }
});
exports.deleteCart = deleteCart;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const orderSchema = joi_1.default.object({
            productId: joi_1.default.string().required(),
            count: joi_1.default.number().integer().min(0).required(),
        });
        const { error, value } = orderSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                data: null,
                error: {
                    message: "Validation Error",
                    details: error.details.map((detail) => detail.message),
                },
            });
            return;
        }
        if (!userId) {
            res.status(401).json({
                data: null,
                error: { message: "You must be an authorized user" },
            });
            return;
        }
        const userCart = yield (0, cart_service_1.getCartService)(userId);
        const { productId, count } = value;
        if (!userCart) {
            res.status(404).json({
                data: null,
                error: {
                    message: "Cart was not found",
                },
            });
            return;
        }
        const fetchingProduct = yield (0, product_repository_1.getProductById)(productId);
        if (fetchingProduct) {
            const itemToUpdate = {
                product: fetchingProduct,
                count: count,
            };
            yield (0, cart_service_1.updateCartService)(userId, itemToUpdate);
        }
        const currentProduct = userCart.items.find((item) => {
            return item.product._id === productId;
        });
        if (currentProduct) {
            const data = {
                cart: {
                    id: userCart._id,
                    items: [currentProduct],
                },
                total: count * (currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.product.price),
            };
            const responseBody = {
                data,
                error: null,
            };
            res.status(200).json(responseBody);
        }
    }
    catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({
            data: null,
            error: { message: "Internal Server Error" },
        });
    }
});
exports.updateCart = updateCart;
