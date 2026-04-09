import express from "express";

import { createEmployeeSkill, fetchEmployeeSkills, removeEmployeeSkill, updateEmployeeSkill } from "../controllers/employee/employeeSkillController.js";
import { authorize } from "../middleware/permissionMiddleware.js";
import { allowSelfOrAdmin } from "../middleware/selfOrAdminMiddleware.js";
import { getEmployeeIdFromSkill } from "../models/ownership/logicModel.js";
import { resolveEmployeeFromSkill } from "../middleware/ownershipMiddleware.js";

const router = express.Router();

// Create
/**
 * @swagger
 * /api/employee-skills:
 *   post:
 *     summary: Assign a skill to an employee
 *     tags: [EMPLOYEE SKILLS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee_id
 *               - skill_id
 *               - proficiency_level
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 example: 1
 *               skill_id:
 *                 type: integer
 *                 example: 2
 *               proficiency_level:
 *                 type: integer
 *                 example: 4
 *               years_of_experience:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Skill added to employee
 *       500:
 *         description: Server error
 */
router.post("/:employeeId", authorize("employeeSkill:create"), allowSelfOrAdmin((req) => req.params.employeeId), createEmployeeSkill);

// Read
/**
 * @swagger
 * /api/employee-skills/{employeeId}:
 *   get:
 *     summary: Get all skills of an employee
 *     tags: [EMPLOYEE SKILLS]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of employee skills
 *       404:
 *         description: Employee not found
 */

// router.get("/:employeeId", fetchEmployeeSkills);
router.get("/:id", authorize("employeeSkill:read"), fetchEmployeeSkills);

// Update
/**
 * @swagger
 * /api/employee-skills/{id}:
 *   put:
 *     summary: Update employee skill details
 *     tags: [EMPLOYEE SKILLS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee skill record ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proficiency_level:
 *                 type: integer
 *                 example: 5
 *               years_of_experience:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Employee skill updated
 */

router.put("/:id", authorize("employeeSkill:update"), allowSelfOrAdmin(resolveEmployeeFromSkill), updateEmployeeSkill);
// router.put("/:id", allowRoles("admin"), updateEmployeeSkill);

// Delete
/**
 * @swagger
 * /api/employee-skills/{id}:
 *   delete:
 *     summary: Remove skill from employee
 *     tags: [EMPLOYEE SKILLS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee skill record ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Skill removed from employee
 */

router.delete("/:id", authorize("employeeSkill:delete"), allowSelfOrAdmin(resolveEmployeeFromSkill), removeEmployeeSkill);
// router.delete("/:id", allowRoles("admin"), removeEmployeeSkill);

export default router;