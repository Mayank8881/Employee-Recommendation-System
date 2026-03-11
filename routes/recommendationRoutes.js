import express from "express";
import { recommendEmployees } from "../controllers/recommendation/recommendationController.js";

const router = express.Router();

router.get("/:projectId", recommendEmployees);

export default router;