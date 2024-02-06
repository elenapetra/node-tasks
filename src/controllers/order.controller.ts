import { Response } from "express";
import {
  checkoutOrderService,
  saveOrderService,
} from "../services/order.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { OrderEntity, ORDER_STATUS } from "../utils/types";
const uuid = require("uuid");

export const createUserOrders = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
      return;
    } else {
      const userCart = await checkoutOrderService(userId);
      if (!userCart) {
        res
          .status(401)
          .json({ data: null, error: { message: "Cart is empty" } });
      } else {
        const userOrder = {
          id: uuid.v4(),
          userId: userId,
          cartId: userCart.id,
          items: userCart.items,
          payment: { type: "paypal" },
          delivery: { type: "post", address: {} },
          comments: "",
          status: "created" as ORDER_STATUS,
          total: userCart.items.reduce(
            (acc, item) => acc + item.product.price * item.count,
            0
          ),
        };
        await saveOrderService(userOrder);
        const responseBody = {
          data: { userOrder },
          error: null,
        };
        res.status(200).json(responseBody);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
