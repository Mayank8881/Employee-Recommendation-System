import { getCache, setCache } from "../utils/cacheClient.js";
import {
    getEmployeeIdFromEmployee,
    getEmployeeIdFromSkill
} from "../models/ownership/logicModel.js";

// 🔹 Employee Skill Resolver (WITH CACHE)
export const resolveEmployeeFromSkill = async (req) => {
    const skillId = req.params.id;
    const cacheKey = `ownership:employee_skill:${skillId}`;

    // ✅ 1. Check cache
    const cached = await getCache(cacheKey);
    if (cached) {
        console.log("⚡ ABAC CACHE HIT");
        return cached;
    }

    console.log("❌ ABAC CACHE MISS");

    // ❌ 2. DB call
    const employeeId = await getEmployeeIdFromSkill(skillId);

    if (!employeeId) return null;

    // ✅ 3. Store in cache
    await setCache(cacheKey, employeeId);

    return employeeId;
};


// 🔹 Employee Resolver (NO CACHE NEEDED)
export const resolveEmployeeFromEmployee = async (req) => {
    return getEmployeeIdFromEmployee(req.params.id);
};