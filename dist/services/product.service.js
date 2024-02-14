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
exports.getProductById = exports.getProductsList = void 0;
const product_repository_1 = require("../repositories/product.repository");
const getProductsList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_repository_1.getAllProductsObjects)();
        return products;
    }
    catch (error) {
        console.error("Error getting products:", error);
        return [];
    }
});
exports.getProductsList = getProductsList;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_repository_1.getProductObject)(productId);
        return product;
    }
    catch (error) {
        console.error("Error getting product:", error);
        return;
    }
});
exports.getProductById = getProductById;
