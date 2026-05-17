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
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
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
