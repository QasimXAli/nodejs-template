import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Clean API',
      version: '1.0.0',
      description: 'Backend API with Express, TypeScript, and Clean Architecture',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts'], // add more as needed
});
