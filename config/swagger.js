import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Recommendation Engine API's",
            version: "1.0.0",
            description: "API documentation for Employee Recommendation Engine"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./routes/*.js"] // location of route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;