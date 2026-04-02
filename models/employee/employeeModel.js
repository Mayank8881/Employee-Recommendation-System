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

    // Fetch employee first
    const { data: employee, error: fetchError } = await supabase
        .from("employees")
        .select("*")
        .eq("id", id);

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    if (!employee || employee.length === 0) {
        throw new Error("Employee not found");
    }

    const user = employee[0];

    // Prevent deleting admin
    if (user.role === "admin") {
        throw new Error("Admin users cannot be deleted");
    }

    //Delete Employee
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
export const putEmployee = async (id, employeeData) => {
    const { data, error } = await supabase
        .from("employees")
        .update(employeeData)
        .eq("id", id)
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
