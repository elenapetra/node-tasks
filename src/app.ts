import {
  authenticateMiddleware,
  authorizeMiddleware,
} from "./middleware/auth.middleware";
import * as CartController from "./controllers/cart.controller";
import * as ProductController from "./controllers/product.controller";
import * as OrderController from "./controllers/order.controller";
import * as UserController from "./controllers/user.controller";
const bodyParser = require("body-parser");
import connectDB from "./db";
require("dotenv").config();

const express = require("express");
const app = express();
const port = 8000;

connectDB().then(() => {
  const userRouter = express.Router();
  const productRouter = express.Router();
  const authRouter = express.Router();

  app.use(bodyParser.json());

  userRouter.get("/cart", authenticateMiddleware, CartController.getUserCart);
  userRouter.put(
    "/cart",
    authenticateMiddleware,
    CartController.updateUserCart
  );
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

  app.use("/api/profile", userRouter);
  app.use("/api/", productRouter);
  app.use("/api/auth", authRouter);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
