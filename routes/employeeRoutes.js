import { createEmployee, fetchEmployeeById, fetchEmployees, removeEmployee, updateEmployee } from "../controllers/employee/employeeController.js";
import express from "express";

const router = express.Router();

// Create Employee
router.post("/", createEmployee);

//update Employee
router.put("/:id", updateEmployee);

//get Employees
router.get("/", fetchEmployees);

//get Employee by ID
router.get("/:id", fetchEmployeeById);

//delete Employee
router.delete("/:id",removeEmployee);

export default router;