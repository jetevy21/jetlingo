import { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { userStats, userProgress, conversations } from '../db/schema.js';
import { eq, and, gte, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

export default async function progressRoutes(app: FastifyInstance) {
  app.get('/api/progress', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    const statsResult = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);

    const progressResult = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    const completed = progressResult.filter((p) => p.status === 'completed').length;
    const inProgress = progressResult.filter((p) => p.status === 'in_progress').length;
    const total = progressResult.length;

    return reply.send({
      stats: statsResult[0] || {
        totalMinutesLearned: 0,
        totalSessions: 0,
        totalWordsLearned: 0,
        currentStreak: 0,
        longestStreak: 0,
        averagePronunciationScore: 0,
        averageGrammarScore: 0,
      },
      lessonsCompleted: completed,
      lessonsInProgress: inProgress,
      totalLessons: total,
    });
  });

  app.get('/api/progress/stats', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    const statsResult = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);

    const convoResult = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.createdAt));

    const totalScore = convoResult.reduce((sum, c) => sum + (c.score || 0), 0);
    const avgScore = convoResult.length > 0 ? totalScore / convoResult.length : 0;

    const recentConversations = convoResult.slice(0, 10).map((c) => ({
      id: c.id,
      mode: c.mode,
      duration: c.duration,
      score: c.score,
      createdAt: c.createdAt,
    }));

    return reply.send({
      stats: statsResult[0] || {
        totalMinutesLearned: 0,
        totalSessions: 0,
        totalWordsLearned: 0,
        currentStreak: 0,
        longestStreak: 0,
        averagePronunciationScore: 0,
        averageGrammarScore: 0,
      },
      averageScore: Math.round(avgScore * 10) / 10,
      totalConversations: convoResult.length,
      recentConversations,
    });
  });

  app.get('/api/progress/chart', { preHandler: [authMiddleware] }, async (request, reply) => {
    const userId = (request as any).userId as string;

    const statsResult = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);

    const weeklyMinutes = (statsResult[0]?.weeklyMinutes as Record<string, number>) || {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentConversations = await db
      .select()
      .from(conversations)
      .where(
        and(
          eq(conversations.userId, userId),
          gte(conversations.createdAt, thirtyDaysAgo)
        )
      )
      .orderBy(desc(conversations.createdAt));

    const dailyMinutes: Record<string, number> = {};
    recentConversations.forEach((c) => {
      const date = new Date(c.createdAt).toISOString().split('T')[0];
      dailyMinutes[date] = (dailyMinutes[date] || 0) + Math.floor((c.duration || 0) / 60);
    });

    const dailyScores: Record<string, number[]> = {};
    recentConversations.forEach((c) => {
      if (c.score) {
        const date = new Date(c.createdAt).toISOString().split('T')[0];
        if (!dailyScores[date]) dailyScores[date] = [];
        dailyScores[date].push(c.score);
      }
    });

    const averageDailyScores: Record<string, number> = {};
    Object.entries(dailyScores).forEach(([date, scores]) => {
      averageDailyScores[date] = Math.round(
        (scores.reduce((a, b) => a + b, 0) / scores.length) * 10
      ) / 10;
    });

    return reply.send({
      weeklyMinutes,
      dailyMinutes,
      dailyScores: averageDailyScores,
    });
  });
}
