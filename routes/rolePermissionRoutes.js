import express from "express";
import {
  assignPermissionToRole,
  removePermissionFromRole,
  fetchRolePermissions
} from "../controllers/permission/rolePermissionController.js";

import { authorize } from "../middleware/permissionMiddleware.js";
import { allowAdminOnly } from "../middleware/adminMiddleware.js";
// optional: admin-only middleware

const router = express.Router();

// 🔹 Assign
router.post(
  "/",
  allowAdminOnly(),
  assignPermissionToRole
);

// 🔹 Remove
router.delete(
  "/",
  allowAdminOnly(),
  removePermissionFromRole
);

// 🔹 Get
router.get(
  "/:roleId",
  allowAdminOnly(),
  fetchRolePermissions
);

export default router;