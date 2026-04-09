import express from "express";
import { recommendEmployees } from "../controllers/recommendation/recommendationController.js";
import { authorize } from "../middleware/permissionMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/recommendations/{projectId}:
 *   get:
 *     summary: Get ranked employee recommendations for a project
 *     tags: [Recommendation Engine]
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
 *         description: Ranked list of recommended employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project_id:
 *                   type: integer
 *                   example: 1
 *                 recommended_employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       employee_id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: Rahul Sharma
 *                       score:
 *                         type: number
 *                         example: 87
 *                       explanation:
 *                         type: string
 *                         example: Matched skill Node.js, Higher proficiency than required, Strong experience, Employee available
 *       404:
 *         description: Project not found
 *       500:
 *         description: Recommendation engine error
 */
router.get("/:projectId",authorize("recommendation:read"), recommendEmployees);
// router.get("/:projectId", recommendEmployees);

export default router;