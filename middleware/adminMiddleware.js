export const allowAdminOnly = (adminRoleId = 1) => {
  return (req, res, next) => {
    try {
      const roleId = req.user.role_id;

      if (roleId === adminRoleId) {
        return next();
      }

      return res.status(403).json({
        message: "Access denied: Admins only"
      });

    } catch (err) {
      return res.status(500).json({
        message: "Admin check failed",
        error: err.message
      });
    }
  };
};