import supabase from "../../config/supabase.js";

// Create Employee
export const postEmployee = async (employeeData) => {
    const { data, error } = await supabase
        .from("employees")
        .insert([employeeData])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Get All Employees
export const getAllEmployees = async () => {
    const { data, error } = await supabase
        .from("employees")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// Get Employee By ID
export const getEmployeeById = async (id) => {
    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

//delete Employee
export const deleteEmployee = async (id) => {
    const { data, error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id)
    if (error) {
        throw new Error(error, message);
    }
    return data;
}

//update Employee
export const putEmployee = async (employeeData, id) => {
    const { data, error } = await supabase
        .from("employees")
        .update(employeeData)
        .eq(id)
    if (error) {
        throw new Error(error, message);
    }
    return data;
}
