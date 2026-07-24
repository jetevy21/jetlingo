import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db/index.js';
import { conversations, avatars, userStats } from '../db/schema.js';
import { eq, and, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';
import { generateLessonResponse } from '../agents/lesson-agent.js';
import { analyzeConversation } from '../agents/progress-agent.js';
import { updateMemory } from '../services/memory.js';
import { calculateStreak, getWeeklyMinutesKey } from '../utils/helpers.js';

const messageSchema = z.object({
  content: z.string().min(1),
  audioUrl: z.string().url().optional(),
});

export default async function conversationsRoutes(app: FastifyInstance) {
  app.get('/api/conversations', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    const result = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.createdAt));

    return reply.send({ conversations: result });
  });

  app.get('/api/conversations/:id', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;
    const { id } = request.params as { id: string };

    const result = await db
      .select()
      .from(conversations)
      .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
      .limit(1);

    const conversation = result[0];
    if (!conversation) {
      return reply.status(404).send({ error: 'Conversation not found' });
    }

    let avatar = null;
    if (conversation.avatarId) {
      const avatarResult = await db
        .select()
        .from(avatars)
        .where(eq(avatars.id, conversation.avatarId))
        .limit(1);
      avatar = avatarResult[0] || null;
    }

    return reply.send({ conversation, avatar });
  });

  app.post(
    '/api/conversations/:id/message',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const userId = (request as any).userId as string;
      const { id } = request.params as { id: string };

      const parsed = messageSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() });
      }

      const { content, audioUrl } = parsed.data;

      const convoResult = await db
        .select()
        .from(conversations)
        .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
        .limit(1);

      const conversation = convoResult[0];
      if (!conversation) {
        return reply.status(404).send({ error: 'Conversation not found' });
      }

      let avatarData = null;
      if (conversation.avatarId) {
        const avatarResult = await db
          .select()
          .from(avatars)
          .where(eq(avatars.id, conversation.avatarId))
          .limit(1);
        avatarData = avatarResult[0] || null;
      }

      const existingMessages = (conversation.messages as Array<{
        role: string;
        content: string;
        timestamp: string;
        feedback?: any;
      }>) || [];

      const userMessage = {
        role: 'user',
        content,
        audioUrl: audioUrl || null,
        timestamp: new Date().toISOString(),
        feedback: null,
      };

      const updatedMessages = [...existingMessages, userMessage];

      const aiResponse = await generateLessonResponse({
        userId,
        messages: updatedMessages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        avatarPersonality: avatarData?.personality,
        targetLanguage: conversation.mode,
      });

      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
        feedback: null,
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      await db
        .update(conversations)
        .set({
          messages: finalMessages,
          updatedAt: new Date(),
        })
        .where(eq(conversations.id, id));

      return reply.send({
        message: assistantMessage,
        conversationId: id,
      });
    }
  );

  app.post(
    '/api/conversations/:id/end',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const userId = (request as any).userId as string;
      const { id } = request.params as { id: string };

      const convoResult = await db
        .select()
        .from(conversations)
        .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
        .limit(1);

      const conversation = convoResult[0];
      if (!conversation) {
        return reply.status(404).send({ error: 'Conversation not found' });
      }

      let analysis = null;
      try {
        analysis = await analyzeConversation(id, userId);
      } catch (error) {
        analysis = { overallScore: 70 };
      }

      const startTime = new Date(conversation.createdAt).getTime();
      const duration = Math.floor((Date.now() - startTime) / 1000);

      await db
        .update(conversations)
        .set({
          duration,
          score: analysis?.overallScore || 70,
          updatedAt: new Date(),
        })
        .where(eq(conversations.id, id));

      const minutesPlayed = Math.floor(duration / 60);
      await updateMemory(userId, { minutesPlayed });

      const statsResult = await db
        .select()
        .from(userStats)
        .where(eq(userStats.userId, userId))
        .limit(1);

      if (statsResult[0]) {
        const newStreak = calculateStreak(statsResult[0].updatedAt, statsResult[0].currentStreak);
        const weeklyKey = getWeeklyMinutesKey();
        const weeklyMinutes = (statsResult[0].weeklyMinutes as Record<string, number>) || {};
        weeklyMinutes[weeklyKey] = (weeklyMinutes[weeklyKey] || 0) + minutesPlayed;

        await db
          .update(userStats)
          .set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, statsResult[0].longestStreak),
            weeklyMinutes,
            updatedAt: new Date(),
          })
          .where(eq(userStats.userId, userId));
      }

      return reply.send({
        conversationId: id,
        duration,
        score: analysis?.overallScore || 70,
        analysis,
      });
    }
  );
}
