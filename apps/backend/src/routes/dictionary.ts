import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { dictionary } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const saveWordSchema = z.object({
  word: z.string().min(1),
  translation: z.string().min(1),
  language: z.string().min(1),
  context: z.string().min(1),
  audioUrl: z.string().url().optional(),
});

export default async function dictionaryRoutes(app: FastifyInstance) {
  app.get('/api/dictionary', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;
    const { language } = request.query as { language?: string };

    const conditions = [eq(dictionary.userId, userId)];
    if (language) conditions.push(eq(dictionary.language, language));

    const result = await db
      .select()
      .from(dictionary)
      .where(and(...conditions))
      .orderBy(desc(dictionary.createdAt));

    return reply.send({ words: result });
  });

  app.post('/api/dictionary', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    const parsed = saveWordSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() });
    }

    const { word, translation, language, context, audioUrl } = parsed.data;

    const result = await db
      .insert(dictionary)
      .values({
        id: uuidv4(),
        userId,
        word,
        translation,
        language,
        context,
        audioUrl: audioUrl || null,
      })
      .returning();

    return reply.status(201).send({ word: result[0] });
  });

  app.delete('/api/dictionary/:id', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;
    const { id } = request.params as { id: string };

    const existing = await db
      .select()
      .from(dictionary)
      .where(and(eq(dictionary.id, id), eq(dictionary.userId, userId)))
      .limit(1);

    if (!existing[0]) {
      return reply.status(404).send({ error: 'Word not found' });
    }

    await db.delete(dictionary).where(eq(dictionary.id, id));
    return reply.send({ success: true });
  });
}
