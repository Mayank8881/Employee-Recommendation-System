import { getEmployeesWithSkills, getProjectSkills } from "../../models/recommendation/recommendationModel.js";
import { calculateScore } from "../../utils/recommendationEngine.js";

export const recommendEmployees = async (req, res) => {

    try {

        const { projectId } = req.params;

        const projectSkills = await getProjectSkills(projectId);
        const employees = await getEmployeesWithSkills();

        let recommendations = [];

        employees.forEach(employee => {

            const result = calculateScore(
                employee.employee_skills,
                projectSkills,
                employee
            );

            recommendations.push({
                employee_id: employee.id,
                name: `${employee.first_name} ${employee.last_name}`,
                score: result.score,
                explanation: result.explanation
            });

        });

        // Sort by score
        recommendations.sort((a, b) => b.score - a.score);

        res.json({
            project_id: projectId,
            recommended_employees: recommendations
        });

    } catch (error) {

        res.status(500).json({
            message: "Recommendation engine error",
            error: error.message
        });

    }
};