import supabase from "../../config/supabase.js"

// Create Project
export const postProject = async (projectData) => {
    const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Get All Projects
export const getAllProjects = async () => {
    const { data, error } = await supabase
        .from("projects")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Get Project by ID
export const getProjectById = async (id) => {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Update Project
export const putProject = async (id, projectData) => {
    const { data, error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Delete Project
export const deleteProject = async (id) => {
    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    return { message: "Project deleted successfully" };
};