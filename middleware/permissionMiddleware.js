import supabase from "../config/supabase.js";

export const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;

      // fetch permissions for role
      const { data, error } = await supabase
        .from("role_permissions")
        .select(`
          permissions(name)
        `)
        .eq("role_id", roleId);

      if (error) throw error;

      const permissions = data.map(p => p.permissions.name);

      // check permission
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