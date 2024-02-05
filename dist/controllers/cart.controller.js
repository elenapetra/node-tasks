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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCart = exports.deleteCart = exports.getUserCart = void 0;
const cart_service_1 = require("../services/cart.service");
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (userId) {
            const userCart = yield (0, cart_service_1.getCartService)(userId);
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
                        total: userCart.items.reduce((total, item) => total + item.product.price * item.count, 0),
                    },
                    error: null,
                };
                res.status(200).json(responseData);
            }
            else {
                res
                    .status(404)
                    .json({ data: null, error: { message: "Cart not found." } });
            }
        }
        else {
            res.status(401).json({
                data: null,
                error: { message: "You must be an authorized user" },
            });
        }
        /////
    }
    catch (error) {
        res
            .status(500)
            .json({ data: null, error: { message: "Internal Server Error" } });
    }
});
exports.getUserCart = getUserCart;
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
//     // Assuming you have a function to validate and process the product update
//     const updatedCart = { productId, count };
//     await updateCartService(userId, updatedCart);
//     res.status(200).json({ message: "Cart updated successfully." });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header("x-user-id");
    if (!userId) {
        res.status(401).json({
            error: "'Unauthorized: x-user-id header missing.(From order controller)'",
        });
        return;
    }
    yield (0, cart_service_1.deleteCartService)(userId);
    res.status(200).json({ message: "Cart deleted successfully." });
});
exports.deleteCart = deleteCart;
const checkoutCart = (req, res) => { };
exports.checkoutCart = checkoutCart;
