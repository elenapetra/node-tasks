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
exports.getProduct = exports.getProducts = void 0;
const product_service_1 = require("../services/product.service");
const logger_1 = require("../utils/logger");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_service_1.getProductsList)();
        const responseBody = {
            data: Object.values(products),
            error: null,
        };
        res.status(200).json(responseBody);
    }
    catch (error) {
        logger_1.logger.error("Error getting products: ", error);
        res.status(500).json({
            data: null,
            error: {
                message: "Internal Server error",
            },
        });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield (0, product_service_1.getProductById)(productId);
        if (!product) {
            res
                .status(404)
                .json({ data: null, error: { message: "No product with such id" } });
            return;
        }
        const responseBody = {
            data: Object.assign({}, product),
            error: null,
        };
        res.status(200).json(responseBody);
    }
    catch (error) {
        logger_1.logger.error("Error getting product: ", error);
        res.status(500).json({
            data: null,
            error: {
                message: "Internal Server error",
            },
        });
    }
});
exports.getProduct = getProduct;
