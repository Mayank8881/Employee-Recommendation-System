export const allowSelfOrAdmin = ({
    getTargetId = (req) => req.params.id,
    adminRoleId = 1
} = {}) => {
    return (req, res, next) => {
        try {
            const userId = req.user.id;
            const roleId = req.user.role_id;
            const targetId = getTargetId(req);
            const skillempId=req.body.employee_id

            console.log(skillempId);

            // ✅ allow if admin
            if (roleId === adminRoleId) {
                return next();
            }

            if(userId === skillempId){
                return next();
            }
            // ✅ allow if same user (owner)
            if (userId == targetId) {
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