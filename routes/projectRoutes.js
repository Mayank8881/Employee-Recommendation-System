import e from "express";
import { createProject, fetchProjects, removeProject, updateProject } from "../controllers/projects/projectController.js";
const router = e.Router()

//Create Project
router.post("/", createProject)

//Get All Projects
router.get("/", fetchProjects)

//Update Project
router.put("/:id",updateProject)

//delete Project
router.delete("/:id",removeProject)

export default router