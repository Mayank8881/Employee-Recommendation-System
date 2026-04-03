import express from "express";
import { createProjectSkill, fetchProjectSkills, removeProjectSkill, updateProjectSkill } from "../controllers/projects/projectSkillController.js";
import { allowRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();

// Create
/**
 * @swagger
 * /api/project-skills:
 *   post:
 *     summary: Add required skill to a project
 *     tags: [PROJECT SKILLS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - skill_id
 *               - required_proficiency
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 1
 *               skill_id:
 *                 type: integer
 *                 example: 2
 *               required_proficiency:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Skill requirement added to project
 */

// router.post("/", createProjectSkill);
router.post("/",allowRoles("admin"), createProjectSkill);

// Read
/**
 * @swagger
 * /api/project-skills/{projectId}:
 *   get:
 *     summary: Get all required skills for a project
 *     tags: [PROJECT SKILLS]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of project required skills
 */
router.get("/:projectId", allowRoles("user","admin"),fetchProjectSkills);
// router.get("/:projectId", fetchProjectSkills);

// Update
/**
 * @swagger
 * /api/project-skills/{id}:
 *   put:
 *     summary: Update project skill requirement
 *     tags: [PROJECT SKILLS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project skill record ID
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
 *               required_proficiency:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Project skill updated
 */
router.put("/:id",allowRoles("admin"), updateProjectSkill);
// router.put("/:id", updateProjectSkill);

// Delete
/**
 * @swagger
 * /api/project-skills/{id}:
 *   delete:
 *     summary: Remove required skill from project
 *     tags: [PROJECT SKILLS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project skill record ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Project skill removed
 */
router.delete("/:id",allowRoles("admin"), removeProjectSkill);
// router.delete("/:id", removeProjectSkill);

export default router;