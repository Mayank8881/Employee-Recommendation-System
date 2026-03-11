import express from "express";
import { createProjectSkill, fetchProjectSkills, removeProjectSkill, updateProjectSkill } from "../controllers/projects/projectSkillController.js";


const router = express.Router();

// Create
router.post("/", createProjectSkill);

// Read
router.get("/:projectId", fetchProjectSkills);

// Update
router.put("/:id", updateProjectSkill);

// Delete
router.delete("/:id", removeProjectSkill);

export default router;