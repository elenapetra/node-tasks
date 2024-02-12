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
const product_model_1 = __importDefault(require("../models/schemas/product.model"));
const db_1 = __importDefault(require("../db"));
const productsData = require("../data/products.json");
const insertProductsData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_model_1.default.insertMany(productsData);
        console.log("Products data inserted successfully");
    }
    catch (error) {
        console.error("Error inserting product data:", error);
    }
    //   finally {
    //     mongoose.disconnect();
    //   }
});
(0, db_1.default)().then(() => insertProductsData());
