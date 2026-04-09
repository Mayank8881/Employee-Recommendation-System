import express from "express";
import { searchEmployee } from "../controllers/search/employeeSearchController.js";
import { authorize } from "../middleware/permissionMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/employees/search:
 *   get:
 *     summary: Search employees using filters
 *     tags: [EMPLOYEE SEARCH]
 *     parameters:
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         description: Filter by employee first name
 *         example: Rahul
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         description: Filter by employee last name
 *         example: Sharma
 *       - in: query
 *         name: skill
 *         schema:
 *           type: string
 *         description: Filter by skill name
 *         example: Node.js
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *         example: Engineering
 *       - in: query
 *         name: experience
 *         schema:
 *           type: integer
 *         description: Minimum years of experience
 *         example: 3
 *       - in: query
 *         name: availability
 *         schema:
 *           type: boolean
 *         description: Filter available employees
 *         example: true
 *     responses:
 *       200:
 *         description: List of employees matching filters
 *       500:
 *         description: Server error
 */

// router.get("/", searchEmployee);
router.get("/",authorize("employeeSearch:read"), searchEmployee);

export default router;