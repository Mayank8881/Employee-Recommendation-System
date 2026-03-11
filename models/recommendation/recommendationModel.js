import supabase from "../../config/supabase.js";

export const getProjectSkills = async (projectId) => {

    const { data, error } = await supabase
        .from("project_skills")
        .select(`
      skill_id,
      required_proficiency,
      skills(skill_name)
    `)
        .eq("project_id", projectId);

    if (error) throw new Error(error.message);

    return data;
};

export const getEmployeesWithSkills = async () => {

    const { data, error } = await supabase
        .from("employees")
        .select(`
      id,
      first_name,
      last_name,
      experience_years,
      availability_status,
      employee_skills(
        skill_id,
        proficiency_level
      )
    `);

    if (error) throw new Error(error.message);

    return data;
};