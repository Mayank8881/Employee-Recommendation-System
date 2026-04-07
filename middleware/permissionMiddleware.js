import redisClient from "../config/redis.js";
import supabase from "../config/supabase.js";

export const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const roleId = req.user.role_id;

            const cacheKey = `role:${roleId}:permissions`;

            let permissions;

            //Check Redis Cache
            const cachedPermissions = await redisClient.get(cacheKey);

            if (cachedPermissions) {
                console.log("✅ CACHE HIT");
                permissions = JSON.parse(cachedPermissions);
            }
            else {
                // Fallback to DB
                console.log("❌ CACHE MISS → Fetching from DB");
                const { data, error } = await supabase
                    .from("role_permissions")
                    .select(`permissions(name)`)
                    .eq("role_id", roleId);

                if (error) throw error;

                // permissions = data.map(p => p.permissions.name);
                permissions = data
                    .filter(p => p.permissions)
                    .map(p => {
                        // prefer structured if available
                        if (p.permissions.resource && p.permissions.action) {
                            return `${p.permissions.resource}:${p.permissions.action}`;
                        }
                        return p.permissions.name; // fallback (old)
                    });


                //Store in Redis (cache for 10 mins)
                await redisClient.setEx(
                    cacheKey,
                    600, // seconds
                    JSON.stringify(permissions)
                );
            }
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