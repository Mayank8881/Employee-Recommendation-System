import { searchEmployees } from "../../models/search/employeeSearchModel.js";

export const searchEmployee = async (req, res) => {
    try {

        const filters = {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            department: req.query.department,
            availability: req.query.availability,
            experience: req.query.experience,
            skill: req.query.skill
        };

        const employees = await searchEmployees(filters);

        res.json({
            message: "Employee search results",
            filters,
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            message: "Error searching employees",
            error: error.message
        });
    }
};