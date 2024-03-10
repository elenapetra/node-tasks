import { Response } from "express";
import { createOrder, saveOrder } from "../services/order.service";
import { CustomRequest } from "../utils/types";
import { ORDER_STATUS } from "../utils/types";
import { Types } from "mongoose";
import { logger } from "../utils/logger";
import { deleteCart } from "../services/cart.service";

export const createUserOrders = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
      return;
    }
    const userCart = await createOrder(userId);
    if (!userCart) {
      logger.error("User cart was not found");
      res.status(400).json({ data: null, error: { message: "Cart is empty" } });
      return;
    }
    if (userCart.items.length === 0) {
      res.status(400).json({ data: null, error: { message: "Cart is empty" } });
      return;
    }
    const userOrder = {
      _id: new Types.ObjectId(),
      userId: userId,
      cartId: userCart._id.toString(),
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
    await saveOrder(userOrder);
    await deleteCart(userId);
    await deleteCart(userId);
    const responseBody = {
      data: { userOrder },
      error: null,
    };
    res.status(200).json(responseBody);
  } catch (error) {
    logger.error("Error creating user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
