import supabase from "../../config/supabase.js";
export const searchEmployees = async (filters) => {

    let query = supabase
        .from("employees")
        .select(`
      id,
      first_name,
      last_name,
      email,
      experience_years,
      seniority_level,
      availability_status,
      department,
      employee_skills (
        proficiency_level,
        years_of_experience,
        skills (
          skill_name
        )
      )
    `);

    if (filters.firstname) {
        query = query.ilike("first_name", `%${filters.firstname}%`);
    }

    if (filters.lastname) {
        query = query.ilike("last_name", `%${filters.lastname}%`);
    }

    if (filters.department) {
        query = query.eq("department", filters.department);
    }

    if (filters.availability) {
        query = query.eq("availability_status", filters.availability);
    }

    if (filters.experience) {
        query = query.gte("experience_years", filters.experience);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    // Filter by skill if provided
    let filteredData = data;

    if (filters.skill) {
        filteredData = data.filter(emp =>
            emp.employee_skills.some(skill =>
                skill.skills.skill_name.toLowerCase() === filters.skill.toLowerCase()
            )
        );
    }

    return filteredData;
};