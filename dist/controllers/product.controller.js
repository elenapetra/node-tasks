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
exports.getProductById = exports.getAllProducts = void 0;
const product_service_1 = require("../services/product.service");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.getAllProductsService)();
    const responseBody = {
        data: Object.assign({}, products),
        error: null,
    };
    res.json(responseBody);
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield (0, product_service_1.getProductByIdService)(productId);
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
    res.json(responseBody);
});
exports.getProductById = getProductById;
