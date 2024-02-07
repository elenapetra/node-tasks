import { authMiddleware } from "./middleware/auth.middleware";
import * as CartController from "./controllers/cart.controller";
import * as ProductController from "./controllers/product.controller";
import * as OrderController from "./controllers/order.controller";
const bodyParser = require("body-parser");

const express = require("express");

const app = express();
const port = 8000;

const userRouter = express.Router();
const productRouter = express.Router();

userRouter.use(authMiddleware);
productRouter.use(authMiddleware);
app.use(bodyParser.json());

userRouter.get("/cart", CartController.getUserCart);

userRouter.put("/cart", CartController.updateCart);

userRouter.delete("/cart", CartController.deleteCart);

userRouter.post("/cart/checkout", OrderController.createUserOrders);

productRouter.get("/products", ProductController.getAllProducts);

productRouter.get("/products/:productId", ProductController.getProductById);

app.use("/api/profile", userRouter);
app.use("/api/", productRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
