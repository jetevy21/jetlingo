import { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { avatars } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

export default async function avatarsRoutes(app: FastifyInstance) {
  app.get('/api/avatars', { preHandler: [authMiddleware] }, async (request, reply) => {
    const { language } = request.query as { language?: string };

    let result;
    if (language) {
      result = await db.select().from(avatars).where(eq(avatars.language, language));
    } else {
      result = await db.select().from(avatars);
    }

    return reply.send({ avatars: result });
  });

  app.get('/api/avatars/:id', { preHandler: [authMiddleware] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const result = await db.select().from(avatars).where(eq(avatars.id, id)).limit(1);
    const avatar = result[0];

    if (!avatar) {
      return reply.status(404).send({ error: 'Avatar not found' });
    }

    return reply.send({ avatar });
  });
}
