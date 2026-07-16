/**
 * Swagger/OpenAPI configuration for API documentation
 */
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Petrol Pump Management System API',
      version: '1.0.0',
      description:
        'REST API documentation for Petrol Pump Management System - Authentication, Fuel, Billing, Employees, Reports',
    },
    servers: [
      {
        url: "https://pms-petrol-management-system-production.up.railway.app",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js', './docs/*.yaml'],
};

module.exports = swaggerJsdoc(options);
