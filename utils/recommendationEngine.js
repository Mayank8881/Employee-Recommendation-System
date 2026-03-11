export const calculateScore = (employeeSkills, projectSkills, employee) => {

    let score = 0;
    let proficiencyScore=0;
    let explanation = [];

    const totalProjectSkills = projectSkills.length;

    let matchedSkills = 0;

    projectSkills.forEach(projectSkill => {

        const empSkill = employeeSkills.find(
            s => s.skill_id === projectSkill.skill_id
        );

        if (empSkill) {

            matchedSkills++;

            explanation.push(`Matched skill ${projectSkill.skills.skill_name}`);

            const proficiencyDiff =
                empSkill.proficiency_level - projectSkill.required_proficiency;

            if (proficiencyDiff >= 0) {

                proficiencyScore += 35;
                explanation.push("Equal or Higher proficiency than required : (+35)");

            }
            //   else if (proficiencyDiff === 0) {

            //     score += 15;
            //     explanation.push("Required proficiency matched");

            //   } 
            else {

                proficiencyScore += 15;
                explanation.push("Lower proficiency but usable : (+15)");

            }

        }

    });

    //Final proficiency score
    score+=proficiencyScore/totalProjectSkills

    // Skill coverage weight
    const skillCoverage = matchedSkills / totalProjectSkills;

    let share=skillCoverage*50
    score += skillCoverage * 50;
    explanation.push(
        `Skill coverage ${(skillCoverage * 100).toFixed(0)}% (+${(share)})`
    ); 

    // Experience scoring tiers
    const exp = employee.experience_years;

    if (exp >= 8) {

        score += 10;
        explanation.push("Senior experience level : (+10)");

    } else if (exp >= 5) {

        score += 8;
        explanation.push("Strong experience : (+8)");

    } else if (exp >= 3) {

        score += 6;
        explanation.push("Moderate experience : (+6)");

    } else if (exp >= 1) {

        score += 5;
        explanation.push("Junior experience : (+5)");

    }

    // Availability bonus
    if (employee.availability_status) {

        score += 5;
        explanation.push("Employee available : (+5)");

    }

    return {
        score: Math.round(score),
        explanation: explanation.join(", ")
    };
};