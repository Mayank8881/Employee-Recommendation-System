import {
  addRolePermission,
  deleteRolePermission,
  getPermissionsByRoleId
} from "../../models/permission/rolePermissionModel.js";

import { clearRoleCache } from "../../utils/permissionCache.js";


// ✅ Assign permission
export const assignPermissionToRole = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    await addRolePermission(role_id, permission_id);

    // Clear cache
    await clearRoleCache(role_id);

    res.json({
      message: "Permission assigned successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error assigning permission",
      error: error.message
    });
  }
};


// ✅ Remove permission
export const removePermissionFromRole = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    await deleteRolePermission(role_id, permission_id);

    // Clear cache
    await clearRoleCache(role_id);

    res.json({
      message: "Permission removed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error removing permission",
      error: error.message
    });
  }
};


// ✅ Get permissions
export const fetchRolePermissions = async (req, res) => {
  try {
    const roleId = req.params.roleId;

    const permissions = await getPermissionsByRoleId(roleId);

    res.json({
      message: "Permissions fetched successfully",
      data: permissions
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching permissions",
      error: error.message
    });
  }
};