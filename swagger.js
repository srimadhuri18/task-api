const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task API",
            version: "1.0.0",
            description: "Simple CRUD API built with Express"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
        apis: ["./index.js"]
};
module.exports = swaggerJsdoc(options);