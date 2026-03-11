import supabase from "../../config/supabase.js";

// Add skill requirement to project
export const postProjectSkill = async (skillData) => {
  const { data, error } = await supabase
    .from("project_skills")
    .insert([skillData])
    .select();

  if (error) throw new Error(error.message);

  return data;
};

// Get all required skills for a project
export const getProjectSkills = async (projectId) => {
  const { data, error } = await supabase
    .from("project_skills")
    .select(`
      id,
      required_proficiency,
      skills (
        id,
        skill_name
      )
    `)
    .eq("project_id", projectId);

  if (error) throw new Error(error.message);

  return data;
};

// Update project skill
export const putProjectSkill = async (id, skillData) => {
  const { data, error } = await supabase
    .from("project_skills")
    .update(skillData)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return data;
};

// Delete project skill
export const deleteProjectSkill = async (id) => {
  const { error } = await supabase
    .from("project_skills")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return { message: "Project skill removed successfully" };
};