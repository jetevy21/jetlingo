import { chatCompletion, ChatMessage } from '../services/openai.js';
import { updateMemory } from '../services/memory.js';
import { progressAnalysisPrompt } from '../utils/prompts.js';
import { db } from '../db/index.js';
import { userStats, conversations } from '../db/schema.js';
import { eq, sql } from 'drizzle-orm';

interface ProgressAnalysisResult {
  grammarErrors: Array<{ error: string; correction: string; type: string }>;
  newVocabulary: string[];
  fluency: { responseTime: number; complexity: number; naturalness: number };
  improvementAreas: string[];
  overallScore: number;
}

export async function analyzeConversation(
  conversationId: string,
  userId: string
): Promise<ProgressAnalysisResult> {
  const convoResult = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1);

  const conversation = convoResult[0];
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const messages = conversation.messages as Array<{
    role: string;
    content: string;
  }>;

  const conversationText = messages
    .map((m) => `${m.role === 'user' ? 'Learner' : 'Tutor'}: ${m.content}`)
    .join('\n');

  const chatMessages: ChatMessage[] = [
    { role: 'system', content: progressAnalysisPrompt },
    {
      role: 'user',
      content: `Analyze this language learning conversation:\n\n${conversationText}`,
    },
  ];

  const response = await chatCompletion({
    model: 'gpt-4o',
    messages: chatMessages,
    temperature: 0.3,
    maxTokens: 1024,
  });

  let result: ProgressAnalysisResult;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    result = jsonMatch ? JSON.parse(jsonMatch[0]) : getDefaultResult();
  } catch {
    result = getDefaultResult();
  }

  await updateStats(userId, result, conversation.duration || 0);
  await updateMemoryForAnalysis(userId, result);

  return result;
}

async function updateStats(
  userId: string,
  analysis: ProgressAnalysisResult,
  durationSeconds: number
): Promise<void> {
  const statsResult = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  if (!statsResult[0]) {
    await db.insert(userStats).values({
      userId,
      totalMinutesLearned: Math.floor(durationSeconds / 60),
      totalSessions: 1,
      totalWordsLearned: analysis.newVocabulary.length,
      averagePronunciationScore: analysis.overallScore,
      averageGrammarScore: analysis.overallScore,
      currentStreak: 1,
      longestStreak: 1,
    });
    return;
  }

  const existing = statsResult[0];
  const totalSessions = existing.totalSessions + 1;
  const totalMinutes = existing.totalMinutesLearned + Math.floor(durationSeconds / 60);

  const avgPronunciation =
    (existing.averagePronunciationScore * existing.totalSessions + analysis.overallScore) /
    totalSessions;
  const avgGrammar =
    (existing.averageGrammarScore * existing.totalSessions + analysis.overallScore) /
    totalSessions;

  await db
    .update(userStats)
    .set({
      totalMinutesLearned: totalMinutes,
      totalSessions,
      totalWordsLearned: existing.totalWordsLearned + analysis.newVocabulary.length,
      averagePronunciationScore: Math.round(avgPronunciation * 10) / 10,
      averageGrammarScore: Math.round(avgGrammar * 10) / 10,
      updatedAt: new Date(),
    })
    .where(eq(userStats.userId, userId));
}

async function updateMemoryForAnalysis(
  userId: string,
  analysis: ProgressAnalysisResult
): Promise<void> {
  for (const word of analysis.newVocabulary) {
    await updateMemory(userId, { wordLearned: word });
  }
}

function getDefaultResult(): ProgressAnalysisResult {
  return {
    grammarErrors: [],
    newVocabulary: [],
    fluency: { responseTime: 5, complexity: 5, naturalness: 5 },
    improvementAreas: [],
    overallScore: 70,
  };
}
