import { deleteProjectSkill, getProjectSkills, postProjectSkill, putProjectSkill } from "../../models/project/projectSkillModel.js";

// Add skill to project
export const createProjectSkill = async (req, res) => {
    try {
        const skill = await postProjectSkill(req.body);

        res.status(201).json({
            message: "Skill added to project",
            data: skill
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding project skill",
            error: error.message
        });
    }
};

// Get project skills
export const fetchProjectSkills = async (req, res) => {
    try {
        const { projectId } = req.params;

        const skills = await getProjectSkills(projectId);

        res.json({
            message: "Project skills fetched",
            data: skills
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching project skills",
            error: error.message
        });
    }
};

// Update project skill
export const updateProjectSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await putProjectSkill(id, req.body);

        res.json({
            message: "Project skill updated",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating project skill",
            error: error.message
        });
    }
};

// Delete project skill
export const removeProjectSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteProjectSkill(id);

        res.json(result);

    } catch (error) {
        res.status(500).json({
            message: "Error deleting project skill",
            error: error.message
        });
    }
};