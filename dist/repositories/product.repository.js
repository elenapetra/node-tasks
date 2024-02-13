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
const product_model_1 = require("../models/schemas/product.model");
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.ProductModel.find().exec();
    }
    catch (error) {
        console.error("Error fetching products from MongoDB:", error);
        return [];
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.ProductModel.findById(productId).exec();
        return product ? product.toJSON() : undefined;
    }
    catch (error) {
        console.error("Error fetching product by ID from MongoDB:", error);
        return undefined;
    }
});
exports.getProductById = getProductById;
