import supabase from "../../config/supabase.js";

// 🔹 For employeeSkill → get employee_id using skill ID
export const getEmployeeIdFromSkill = async (req) => {
    const skillId = req.params.id;

    const { data, error } = await supabase
        .from("employee_skills")
        .select("employee_id")
        .eq("id", skillId)
        .single();

    if (error || !data) {
        return null;
    }

    return data.employee_id;
};


// 🔹 For employee (direct)
export const getEmployeeIdFromEmployee = async (req) => {
    return req.params.id;
};


// 🔹 Example: project ownership
// export const getEmployeeIdFromProject = async (req) => {
//   const projectId = req.params.id;

//   const { data, error } = await supabase
//     .from("projects")
//     .select("owner_id")
//     .eq("id", projectId)
//     .single();

//   if (error || !data) {
//     return null;
//   }

//   return data.owner_id;
// };