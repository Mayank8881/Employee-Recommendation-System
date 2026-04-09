import { deleteCache } from "./cacheClient.js";

// 🔹 Clear employee skill ownership cache
export const clearEmployeeSkillCache = async (skillId) => {
    const key = `ownership:employee_skill:${skillId}`;
    await deleteCache(key);
};