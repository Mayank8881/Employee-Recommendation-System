import { deleteEmployeeSkill, getEmployeeSkills, postEmployeeSkill, putEmployeeSkill } from "../../models/employee/employeeSkillModel.js";
import { clearEmployeeSkillCache } from "../../utils/ownershipCache.js";


// Add skill
export const createEmployeeSkill = async (req, res) => {
    try {
        const employeeId = Number(req.params.employeeId);

        // ✅ Prevent override from body
        const { employee_id, ...rest } = req.body;

        const skillData = {
            employee_id: employeeId,
            ...rest
        };

        const skill = await postEmployeeSkill(skillData);

        res.status(201).json({
            message: "Skill added to employee",
            data: skill
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding skill",
            error: error.message
        });
    }
};

// Get skills of employee
export const fetchEmployeeSkills = async (req, res) => {
    try {
        const { id } = req.params;

        const skills = await getEmployeeSkills(id);

        res.json({
            message: "Employee skills fetched",
            data: skills
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching skills",
            error: error.message
        });
    }
};

// Update skill
export const updateEmployeeSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await putEmployeeSkill(id, req.body);

        await clearEmployeeSkillCache(id);

        res.json({
            message: "Employee skill updated",
            data: skill
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating skill",
            error: error.message
        });
    }
};

// Delete skill
export const removeEmployeeSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteEmployeeSkill(id);

        await clearEmployeeSkillCache(id);

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: "Error deleting skill",
            error: error.message
        });
    }
};