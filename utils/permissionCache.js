import { deleteCache } from "./cacheClient.js";

// Clear RBAC cache
export const clearRoleCache = async (roleId) => {
  const key = `role:${roleId}:permissions`;
  await deleteCache(key);
};