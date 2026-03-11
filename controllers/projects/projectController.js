import { deleteProject, getAllProjects, getProjectById, postProject, putProject } from "../../models/project/projectModel.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const project = await postProject(req.body);

    res.status(201).json({
      message: "Project created successfully",
      data: project
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating project",
      error: error.message
    });
  }
};

// Get All Projects
export const fetchProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.json({
      message: "Projects fetched successfully",
      data: projects
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message
    });
  }
};

// Get Project By ID
export const fetchProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);

    res.json({
      message: "Project fetched successfully",
      data: project
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching project",
      error: error.message
    });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await putProject(id, req.body);

    res.json({
      message: "Project updated successfully",
      data: project
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating project",
      error: error.message
    });
  }
};

// Delete Project
export const removeProject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProject(id);

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: "Error deleting project",
      error: error.message
    });
  }
};