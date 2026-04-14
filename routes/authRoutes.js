import express from "express";
import { register, login, adminSetPassword } from "../controllers/auth/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// ------------------- Register User/Admin---------------------------

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new User/Admin
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Mayank
 *               last_name:
 *                 type: string
 *                 example: Mokhere
 *               email:
 *                 type: string
 *                 example: mayank@company.com
 *               password:
 *                 type: integer
 *                 example: 123456789
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post("/register", register);



// ------------------- Login User/Admin---------------------------

router.post("/login", login);

// ADMIN ONLY route
router.patch("/admin/set-password/:userId",
    verifyToken,
    // allowRoles("admin"),
    adminSetPassword
);

export default router;