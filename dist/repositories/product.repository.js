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
exports.getProductById = exports.getAllProducts = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const dataFilePath = "src/data/products.json";
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(dataFilePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error reading products data:", error);
        return [];
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, exports.getAllProducts)();
    const product = products.find((product) => product.id === productId);
    return product;
});
exports.getProductById = getProductById;
