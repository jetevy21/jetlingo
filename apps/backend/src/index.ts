import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { config } from './config.js';
import { pool } from './db/index.js';

import authRoutes from './routes/auth.js';
import lessonsRoutes from './routes/lessons.js';
import conversationsRoutes from './routes/conversations.js';
import avatarsRoutes from './routes/avatars.js';
import dictionaryRoutes from './routes/dictionary.js';
import progressRoutes from './routes/progress.js';
import multimodalRoutes from './routes/multimodal.js';
import subscriptionsRoutes from './routes/subscriptions.js';

const app = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  },
});

await app.register(cors, {
  origin: config.corsOrigin,
  credentials: true,
});

await app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

app.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

await app.register(authRoutes);
await app.register(lessonsRoutes);
await app.register(conversationsRoutes);
await app.register(avatarsRoutes);
await app.register(dictionaryRoutes);
await app.register(progressRoutes);
await app.register(multimodalRoutes);
await app.register(subscriptionsRoutes);

app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  const statusCode = (error as any).statusCode || 500;
  return reply.status(statusCode).send({
    error: (error as any).message || 'Internal Server Error',
    statusCode,
  });
});

async function start() {
  try {
    await pool.query('SELECT 1');
    app.log.info('Database connected successfully');
  } catch (err) {
    app.log.warn('Database not available - running in demo mode (limited functionality)');
    app.log.warn('Start PostgreSQL and run "npm run seed" to enable full features');
  }

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    app.log.info(`Server running on http://localhost:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

export default app;
