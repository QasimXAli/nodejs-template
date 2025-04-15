import express, { json, RequestHandler } from 'express';
import { ENV } from './config/env.config';
import { connectDB } from './config/db.config';
import { errorHandler } from './middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/auth.routes';
import { responseFormatter } from './middleware/response.middleware';

const app = express();

app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs-json', ((_req, res): ReturnType<RequestHandler> => {
  res.json(swaggerSpec);
  return;
}));

app.use(responseFormatter);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(ENV.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${ENV.PORT}`)
  );
});
