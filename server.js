import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import employeeRoutes from "./routes/employeeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import employeeSkillRoutes from "./routes/employeeSkillRoutes.js"
import projectSkillRoutes from "./routes/projectSkillRoutes.js"
import employeeSearchRoutes from "./routes/employeeSearchRoutes.js"
import recommendationRoutes from "./routes/recommendationRoutes.js";
import supabase from "./config/supabase.js";
import swaggerSpec from "./config/swagger.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/employee-skill", employeeSkillRoutes)
app.use("/api/project-skill", projectSkillRoutes)
app.use("/api/employee/search", employeeSearchRoutes)
app.use("/api/recommendations", recommendationRoutes);


//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//
app.get("/test-db", async (req, res) => {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

// Default Route
app.get("/", (req, res) => {
    res.send(`
        <h2>Employee Recommendation Engine API Running</h2>
        <h3>Swagger Docs -> <a href="http://localhost:${PORT}/api-docs">SWAGGER</a>
        <h3>Test DB -> <a href="http://localhost:${PORT}/test-db">DB</a></h3>
    `);
});
// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});