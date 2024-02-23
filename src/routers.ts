import express from "express";
import * as CartController from "./controllers/cart.controller";
import * as ProductController from "./controllers/product.controller";
import * as OrderController from "./controllers/order.controller";
import * as UserController from "./controllers/user.controller";
import {
  authenticateMiddleware,
  authorizeMiddleware,
} from "./middleware/auth.middleware";

export const userRouter = express.Router();
export const productRouter = express.Router();
export const authRouter = express.Router();

userRouter.get("/cart", authenticateMiddleware, CartController.getUserCart);
userRouter.put("/cart", authenticateMiddleware, CartController.updateUserCart);
userRouter.delete(
  "/cart",
  authenticateMiddleware,
  authorizeMiddleware,
  CartController.deleteUserCart
);
userRouter.post(
  "/cart/checkout",
  authenticateMiddleware,
  OrderController.createUserOrders
);

productRouter.get(
  "/products",
  authenticateMiddleware,
  ProductController.getProducts
);
productRouter.get(
  "/products/:productId",
  authenticateMiddleware,
  ProductController.getProduct
);

authRouter.post("/register", UserController.registerUser);
authRouter.post("/login", UserController.loginUser);
