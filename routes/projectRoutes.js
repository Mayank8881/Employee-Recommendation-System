import e from "express";
import { createProject, fetchProjects, removeProject, updateProject } from "../controllers/projects/projectController.js";
const router = e.Router()

//--------------------------------------------Create Project-------------------------------------------
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [PROJECTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_name
 *             properties:
 *               project_name:
 *                 type: string
 *                 example: Employee Recommendation Engine
 *               description:
 *                 type: string
 *                 example: Backend system for recommending employees
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 example: High
 *     responses:
 *       201:
 *         description: Project created successfully
 */

router.post("/", createProject)

// ------------------------------------------Get All Projects---------------------------------------------
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [PROJECTS]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", fetchProjects)

// -------------------------------------------Update Project----------------------------------------------
/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [PROJECTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *               priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put("/:id", updateProject)

//--------------------------------------------delete Project----------------------------------------------
/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [PROJECTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete("/:id", removeProject)

export default router