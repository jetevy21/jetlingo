import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import {
  createUser,
  findUserByEmail,
  comparePassword,
  generateToken,
  findUserById,
} from '../services/auth.js';
import { authMiddleware } from '../middleware/auth.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  nativeLanguage: z.string().optional().default('en'),
  targetLanguage: z.string().optional().default('en'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default async function authRoutes(app: FastifyInstance) {
  app.post('/api/auth/register', async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() });
    }

    const { email, password, name, nativeLanguage, targetLanguage } = parsed.data;

    try {
      const existing = await findUserByEmail(email);
      if (existing) {
        return reply.status(409).send({ error: 'Email already registered' });
      }

      const user = await createUser({ email, password, name, nativeLanguage, targetLanguage });
      const token = generateToken(user.id);

      const { passwordHash, ...userWithoutPassword } = user;
      return reply.status(201).send({ token, user: userWithoutPassword });
    } catch (err: any) {
      if (err?.code === 'ECONNREFUSED' || err?.code === '42P01' || err?.message?.includes('relation')) {
        return reply.status(503).send({
          error: 'Service unavailable',
          message: 'Database not configured. Please install PostgreSQL and run the seed script.',
        });
      }
      throw err;
    }
  });

  app.post('/api/auth/login', async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() });
    }

    const { email, password } = parsed.data;

    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      const token = generateToken(user.id);
      const { passwordHash, ...userWithoutPassword } = user;
      return reply.send({ token, user: userWithoutPassword });
    } catch (err: any) {
      if (err?.code === 'ECONNREFUSED' || err?.code === '42P01' || err?.message?.includes('relation')) {
        return reply.status(503).send({
          error: 'Service unavailable',
          message: 'Database not configured. Please install PostgreSQL and run the seed script.',
        });
      }
      throw err;
    }
  });

  app.get('/api/auth/me', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    try {
      const user = await findUserById(userId);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      const { passwordHash, ...userWithoutPassword } = user;
      return reply.send({ user: userWithoutPassword });
    } catch (err: any) {
      if (err?.code === 'ECONNREFUSED' || err?.code === '42P01' || err?.message?.includes('relation')) {
        return reply.status(503).send({
          error: 'Service unavailable',
          message: 'Database not configured.',
        });
      }
      throw err;
    }
  });
}
