import supabase from "../../config/supabase.js";

// Add skill to employee
export const postEmployeeSkill = async (skillData) => {
    const { data, error } = await supabase
        .from("employee_skills")
        .insert([skillData])
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Get all skills of an employee
export const getEmployeeSkills = async (employeeId) => {
    const { data, error } = await supabase
        .from("employee_skills")
        .select(`
      id,
      proficiency_level,
      years_of_experience,
      skills (
        id,
        skill_name
      )
    `)
        .eq("employee_id", employeeId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Update employee skill
export const putEmployeeSkill = async (id, skillData) => {
    const { data, error } = await supabase
        .from("employee_skills")
        .update(skillData)
        .eq("id", id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Delete employee skill
export const deleteEmployeeSkill = async (id) => {
    const { error } = await supabase
        .from("employee_skills")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    return { message: "Skill removed from employee" };
};