import { Response } from "express";
import {
  checkoutOrderService,
  saveOrderService,
} from "../services/order.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { ORDER_STATUS } from "../utils/types";

export const createUserOrders = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  // try {
  //   const userId = req.userId;
  //   if (!userId) {
  //     res.status(401).json({
  //       data: null,
  //       error: { message: "You must be an authorized user" },
  //     });
  //     return;
  //   }
  //   const userCart = await checkoutOrderService(userId);
  //   if (!userCart) {
  //     console.error("User cart was not found");
  //     return;
  //   }
  //   if (userCart.items.length === 0) {
  //     res.status(400).json({ data: null, error: { message: "Cart is empty" } });
  //     return;
  //   }
  //   const userOrder = {
  //     _id: new Types.ObjectId(),
  //     userId: userId,
  //     cartId: userCart._id.toString(),
  //     items: userCart.items,
  //     payment: { type: "paypal" },
  //     delivery: { type: "post", address: {} },
  //     comments: "",
  //     status: "created" as ORDER_STATUS,
  //     total: userCart.items.reduce(
  //       (acc, item) => acc + item.product.price * item.count,
  //       0
  //     ),
  //   };
  //   await saveOrderService(userOrder);
  //   const responseBody = {
  //     data: { userOrder },
  //     error: null,
  //   };
  //   res.status(200).json(responseBody);
  // } catch (error) {
  //   console.error("Error creating user orders:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};
