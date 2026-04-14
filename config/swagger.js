import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Recommendation Engine API's",
            version: "1.0.0",
            description: "API documentation for Employee Recommendation Engine"
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],

        servers: [
            {
                url:
                    process.env.RENDER_EXTERNAL_URL ||
                    `http://localhost:${process.env.PORT || 5000}`,
            },
        ],
    },

    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;