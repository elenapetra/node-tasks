import { Request, Response } from "express";
import { getUserOrdersService } from "../services/order.service";
import { CustomRequest } from "../middleware/auth.middleware";

// export const getUserOrders = async (
//   req: CustomRequest,
//   res: Response
// ): Promise<void> => {
//   const userId = req.userId;
//   const orderDetail = req.body;
//   try {
//     if (userId) {
//       const order = await getUserOrdersService(userId);
//       if (order) {
//         res.status(200).json(order);
//       } else {
//         res.status(404).json({ error: "Cart not found." });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
