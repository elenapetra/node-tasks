// import { Response } from "express";
// import { getUserByIdService } from "../services/user.service";
// import { CustomRequest } from "../middleware/auth.middleware";

// export const getUserById = async (
//   req: CustomRequest,
//   res: Response
// ): Promise<void> => {
//   const userId = req.userId;

//   try {
//     if (userId) {
//       const user = await getUserByIdService(userId);
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ error: "User not found." });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
