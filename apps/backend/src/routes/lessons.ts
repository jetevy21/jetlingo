import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { lessons, userProgress, conversations } from '../db/schema.js';
import { eq, and, asc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';
import { generateLearningPath } from '../agents/planning-agent.js';
import { v4 as uuidv4 } from 'uuid';

export default async function lessonsRoutes(app: FastifyInstance) {
  app.get('/api/lessons', { preHandler: [authMiddleware] }, async (request, reply) => {
    const { language, category, level } = request.query as {
      language?: string;
      category?: string;
      level?: string;
    };

    const conditions = [eq(lessons.isPublished, true)];
    if (language) conditions.push(eq(lessons.language, language));
    if (category) conditions.push(eq(lessons.category, category));
    if (level) conditions.push(eq(lessons.cefrLevel, level));

    const result = await db
      .select()
      .from(lessons)
      .where(and(...conditions))
      .orderBy(asc(lessons.orderIndex));

    return reply.send({ lessons: result });
  });

  app.get('/api/lessons/:id', { preHandler: [authMiddleware] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const result = await db.select().from(lessons).where(eq(lessons.id, id)).limit(1);
    const lesson = result[0];

    if (!lesson) {
      return reply.status(404).send({ error: 'Lesson not found' });
    }

    return reply.send({ lesson });
  });

  app.post('/api/lessons/:id/start', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;
    const { id: lessonId } = request.params as { id: string };

    const lessonResult = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
    if (!lessonResult[0]) {
      return reply.status(404).send({ error: 'Lesson not found' });
    }

    const existingProgress = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId)))
      .limit(1);

    if (!existingProgress[0]) {
      await db.insert(userProgress).values({
        userId,
        lessonId,
        status: 'in_progress',
      });
    } else {
      await db
        .update(userProgress)
        .set({ status: 'in_progress', updatedAt: new Date() })
        .where(eq(userProgress.id, existingProgress[0].id));
    }

    const conversationId = uuidv4();
    await db.insert(conversations).values({
      id: conversationId,
      userId,
      avatarId: uuidv4(),
      lessonId,
      mode: 'lesson',
    });

    return reply.status(201).send({
      conversationId,
      lesson: lessonResult[0],
    });
  });

  app.get('/api/learning-path', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    try {
      const path = await generateLearningPath(userId);
      return reply.send(path);
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to generate learning path' });
    }
  });
}
