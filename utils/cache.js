import redisClient from "../config/redis.js";

export const clearRoleCache = async (roleId) => {
    const cacheKey = `role:${roleId}:permissions`;
    await redisClient.del(cacheKey);
};