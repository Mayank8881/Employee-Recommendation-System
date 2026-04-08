import supabase from "../config/supabase.js";
import { getCache, setCache } from "../utils/cacheClient.js";

export const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;
      const cacheKey = `role:${roleId}:permissions`;

      let permissions;

      // ✅ Use cache utils
      const cachedPermissions = await getCache(cacheKey);

      if (cachedPermissions) {
        console.log(`✅ RBAC CACHE HIT`);
        permissions = cachedPermissions;
      } else {
        console.log(`❌ RBAC CACHE MISS`);

        const { data, error } = await supabase
          .from("role_permissions")
          .select(`permissions(name, resource, action)`)
          .eq("role_id", roleId);

        if (error) throw error;

        permissions = data
          .filter(p => p.permissions)
          .map(p => {
            if (p.permissions.resource && p.permissions.action) {
              return `${p.permissions.resource}:${p.permissions.action}`;
            }
            return p.permissions.name;
          });

        // ✅ Use cache utils
        await setCache(cacheKey, permissions);
      }

      if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({
          message: "Forbidden: Permission denied"
        });
      }

      next();

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};