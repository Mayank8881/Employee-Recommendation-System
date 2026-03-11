import { deleteEmployeeSkill, getEmployeeSkills, postEmployeeSkill, putEmployeeSkill } from "../../models/employee/employeeSkillModel.js";


// Add skill
export const createEmployeeSkill = async (req, res) => {
    try {
        const skill = await postEmployeeSkill(req.body);

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
        const { employeeId } = req.params;

        const skills = await getEmployeeSkills(employeeId);

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

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: "Error deleting skill",
            error: error.message
        });
    }
};