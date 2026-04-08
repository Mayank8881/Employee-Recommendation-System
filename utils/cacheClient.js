import redisClient from "../config/redis.js";

const DEFAULT_TTL = 600;

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis GET error:", err.message);
    return null;
  }
};

export const setCache = async (key, value, ttl = DEFAULT_TTL) => {
  try {
    await redisClient.setEx(
      key,
      ttl,
      JSON.stringify(value)
    );
  } catch (err) {
    console.error("Redis SET error:", err.message);
  }
};

// ✅ DELETE
export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Redis DEL error:", err.message);
  }
};