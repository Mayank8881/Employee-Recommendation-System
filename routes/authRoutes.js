import express from "express";
import { register, login, adminSetPassword } from "../controllers/auth/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ADMIN ONLY route
router.patch("/admin/set-password/:userId",
  verifyToken,
  allowRoles("admin"),
  adminSetPassword
);

export default router;