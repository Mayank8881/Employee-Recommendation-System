import express from "express";

import { createEmployeeSkill, fetchEmployeeSkills, removeEmployeeSkill, updateEmployeeSkill } from "../controllers/employee/employeeSkillController.js";

const router = express.Router();

// Create
router.post("/", createEmployeeSkill);

// Read
router.get("/:employeeId", fetchEmployeeSkills);

// Update
router.put("/:id", updateEmployeeSkill);

// Delete
router.delete("/:id", removeEmployeeSkill);

export default router;