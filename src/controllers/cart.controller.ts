import { Request, Response } from "express";
import {
  getCartService,
  updateCartService,
  deleteCartService,
  checkoutCartService,
} from "../services/cart.service";
import { CustomRequest } from "../middleware/auth.middleware";

export const getUserCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    if (userId) {
      const userCart = await getCartService(userId);
      if (userCart) {
        const responseData = {
          data: {
            cart: {
              id: userCart.id,
              items: userCart.items.map((item) => ({
                product: {
                  id: item.product.id,
                  title: item.product.title,
                  description: item.product.description,
                  price: item.product.price,
                },
                count: item.count,
              })),
            },
            total: userCart.items.reduce(
              (total, item) => total + item.product.price * item.count,
              0
            ),
          },
          error: null,
        };

        res.status(200).json(responseData);
      } else {
        res
          .status(404)
          .json({ data: null, error: { message: "Cart not found." } });
      }
    } else {
      res.status(401).json({
        data: null,
        error: { message: "You must be an authorized user" },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ data: null, error: { message: "Internal Server Error" } });
  }
};

export const deleteCart = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    if (userId) {
      await deleteCartService(userId);
      res.status(200).json({ data: { success: true }, error: null });
    } else {
      res
        .status(401)
        .json({ data: null, error: { message: "User is not authorized" } });
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
};
// export const updateCart = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const userId = req.header("x-user-id");
//   const { productId, count } = req.body;

//   if (!userId) {
//     res.status(401).json({
//       error: "'Unauthorized: x-user-id header missing.(From order controller)'",
//     });
//     return;
//   }
//   if (!productId || typeof count !== "number") {
//     res.status(400).json({
//       error: "Invalid request body. productId and count are required.",
//     });
//     return;
//   }
//   try {
//     const updatedCart = { productId, count };
//     await updateCartService(userId, updatedCart);
//     res.status(200).json({ message: "Cart updated successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const checkoutCart = (req: Request, res: Response): void => {};
