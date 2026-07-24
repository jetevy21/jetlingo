import { db } from '../db/index.js';
import { userStats, conversations, dictionary, userProgress } from '../db/schema.js';
import { eq, and, desc, gte, sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export interface LearnerContext {
  userId: string;
  level: string;
  goals: string;
  interests: string[];
  recentMistakes: string[];
  wordsLearned: string[];
  conversationCount: number;
  totalMinutes: number;
  currentStreak: number;
}

export interface MemoryUpdate {
  mistake?: string;
  wordLearned?: string;
  minutesPlayed?: number;
}

export async function getMemory(userId: string): Promise<LearnerContext | null> {
  const statsResult = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  const stats = statsResult[0];

  const recentConvos = await db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.createdAt))
    .limit(5);

  const wordsResult = await db
    .select({ word: dictionary.word })
    .from(dictionary)
    .where(eq(dictionary.userId, userId))
    .limit(100);

  return {
    userId,
    level: 'A1',
    goals: 'general',
    interests: [],
    recentMistakes: [],
    wordsLearned: wordsResult.map((w) => w.word),
    conversationCount: stats?.totalSessions || 0,
    totalMinutes: stats?.totalMinutesLearned || 0,
    currentStreak: stats?.currentStreak || 0,
  };
}

export async function updateMemory(userId: string, data: MemoryUpdate): Promise<void> {
  const statsResult = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  if (!statsResult[0]) {
    await db.insert(userStats).values({
      id: uuidv4(),
      userId,
      totalMinutesLearned: data.minutesPlayed || 0,
      totalWordsLearned: data.wordLearned ? 1 : 0,
    });
    return;
  }

  const updates: Record<string, any> = { updatedAt: new Date() };

  if (data.minutesPlayed) {
    updates.totalMinutesLearned = (statsResult[0].totalMinutesLearned || 0) + data.minutesPlayed;
  }
  if (data.wordLearned) {
    updates.totalWordsLearned = (statsResult[0].totalWordsLearned || 0) + 1;
  }

  await db
    .update(userStats)
    .set(updates)
    .where(eq(userStats.userId, userId));
}

export async function getContext(
  userId: string,
  _currentConversationId?: string
): Promise<LearnerContext | null> {
  return getMemory(userId);
}
