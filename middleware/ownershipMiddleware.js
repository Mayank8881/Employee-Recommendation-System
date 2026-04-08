export const allowSelfOrAdmin = (
    getTargetId,
    adminRoleId = 1
) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const roleId = req.user.role_id;

            // ✅ allow if admin
            if (roleId === adminRoleId) {
                return next();
            }

            // ✅ Resolve ownership from DB or params
            const targetId = await getTargetId(req);

            if (!targetId) {
                return res.status(404).json({
                    message: "Resource not found"
                });
            }
            // ✅ Ownership check
            if (Number(userId) === Number(targetId)) {
                return next();
            }

            return res.status(403).json({
                message: "Access denied: You can only modify your own data"
            });

        } catch (err) {
            return res.status(500).json({
                message: "Ownership check failed",
                error: err.message
            });
        }
    };
};