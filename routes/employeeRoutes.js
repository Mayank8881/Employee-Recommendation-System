import { createEmployee, fetchEmployeeById, fetchEmployees, removeEmployee, updateEmployee } from "../controllers/employee/employeeController.js";
import express from "express";
import { authorize } from "../middleware/permissionMiddleware.js";
import { allowSelfOrAdmin } from "../middleware/ownershipMiddleware.js";
import { getEmployeeIdFromEmployee } from "../models/ownership/logicModel.js"

const router = express.Router();

//----------------------------- get employee -------------------------------------
/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [EMPLOYEE]
 *     responses:
 *       200:
 *         description: List of employees
 *       500:
 *         description: Server error
 */

router.get("/", authorize("employee:read"), fetchEmployees);
// router.get("/", allowRoles("user","admin"), fetchEmployees)

// --------------------------------- get Employee by ID --------------------------
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [EMPLOYEE]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 */

// router.get("/:id", fetchEmployeeById);
router.get("/:id", authorize("employee:read"), fetchEmployeeById);
// router.get("/:id", allowRoles("admin"), fetchEmployeeById);

//---------------------------- update Employee ------------------------------------
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee details
 *     tags: [EMPLOYEE]
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               department:
 *                 type: string
 *               availability_status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */

router.put("/:id",authorize("employee:update"), allowSelfOrAdmin(getEmployeeIdFromEmployee), updateEmployee);
// router.put("/:id", allowRoles("admin"), updateEmployee);

// ---------------------------  delete Employee ------------------------------
/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [EMPLOYEE]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 */

router.delete("/:id", authorize("employee:delete"), removeEmployee);
// router.delete("/:id", allowRoles("admin") , removeEmployee);

export default router;