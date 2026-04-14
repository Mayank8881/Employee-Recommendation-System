import express from "express";
import {
  assignPermissionToRole,
  removePermissionFromRole,
  fetchRolePermissions
} from "../controllers/permission/rolePermissionController.js";

import { allowAdminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Role Permissions
 *   description: Manage role-permission mappings (Admin only)
 */

/**
 * @swagger
 * /api/rolePermissions:
 *   post:
 *     summary: Assign permission to a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *               - permission_id
 *             properties:
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               permission_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Permission assigned successfully
 *       403:
 *         description: Access denied (Admin only)
 */
router.post(
  "/",
  allowAdminOnly(),
  assignPermissionToRole
);

/**
 * @swagger
 * /api/rolePermissions:
 *   delete:
 *     summary: Remove permission from a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_id
 *               - permission_id
 *             properties:
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               permission_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Permission removed successfully
 *       403:
 *         description: Access denied (Admin only)
 */
router.delete(
  "/",
  allowAdminOnly(),
  removePermissionFromRole
);

/**
 * @swagger
 * /api/rolePermissions/{roleId}:
 *   get:
 *     summary: Get permissions assigned to a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *       403:
 *         description: Access denied (Admin only)
 */
router.get(
  "/:roleId",
  allowAdminOnly(),
  fetchRolePermissions
);

export default router;