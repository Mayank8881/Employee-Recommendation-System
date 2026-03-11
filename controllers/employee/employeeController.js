import {
    deleteEmployee,
    getAllEmployees,
    getEmployeeById,
    postEmployee,
    putEmployee,
} from "../../models/employee/employeeModel.js";

// Create Employee
export const createEmployee = async (req, res) => {
    try {
        const employee = await postEmployee(req.body);

        res.status(201).json({
            message: "Employee created successfully",
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating employee",
            error: error.message
        });
    }
};

// Get All Employees
export const fetchEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployees();

        res.json({
            message: "Employees fetched successfully",
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching employees",
            error: error.message
        });
    }
};

// Get Employee By ID
export const fetchEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await getEmployeeById(id);

        res.json({
            message: "Employee fetched successfully",
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching employee",
            error: error.message
        });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { employeeData, id } = (req.body, req.params);

        const employee = await putEmployee(employeeData, id)

        res.json({
            message: "Employee updated successfully",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating employee",
            error: error.message
        });
    }
}

export const removeEmployee = async (req, res) => {
    try {
        const { id } = (req.params);

        const employee = await deleteEmployee(id)

        res.json({
            message: "Employee deleted successfully",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting employee",
            error: error.message
        });
    }
}