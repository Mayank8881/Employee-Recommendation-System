import express from "express";
import { searchEmployee } from "../controllers/search/employeeSearchController.js";

const router = express.Router();

router.get("/", searchEmployee);

export default router;