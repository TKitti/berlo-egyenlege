const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Endpoints",
      version: "1.0.0",
      description: "API for the tenant's balance application"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["routes.js"],
  customCssUrl: 'public/swagger-ui.css'
}

const swaggerSpecification = swaggerJsDoc(options);

module.exports = swaggerSpecification;