import { chatCompletion, ChatMessage } from '../services/openai.js';
import { learningPathPrompt } from '../utils/prompts.js';
import { db } from '../db/index.js';
import { lessons, userProgress, userStats, users } from '../db/schema.js';
import { eq, and, asc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

interface LearningPathLesson {
  id: string;
  title: string;
  category: string;
  level: string;
  order: number;
  estimatedMinutes: number;
  description: string;
}

interface LearningPathResult {
  path: LearningPathLesson[];
  totalEstimatedHours: number;
  milestones: Array<{ afterLessons: number; achievement: string }>;
}

export async function generateLearningPath(userId: string): Promise<LearningPathResult> {
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = userResult[0];
  if (!user) throw new Error('User not found');

  const statsResult = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  const progressResult = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  const completedLessonIds = progressResult
    .filter((p) => p.status === 'completed')
    .map((p) => p.lessonId);

  const availableLessons = await db
    .select()
    .from(lessons)
    .where(
      and(
        eq(lessons.language, user.targetLanguage),
        eq(lessons.isPublished, true)
      )
    )
    .orderBy(asc(lessons.orderIndex));

  const context = `Learner profile:
- Native language: ${user.nativeLanguage}
- Target language: ${user.targetLanguage}
- CEFR level: ${user.cefrLevel}
- Learning goal: ${user.learningGoal}
- Interests: ${(user.interests || []).join(', ')}
- Total sessions: ${statsResult[0]?.totalSessions || 0}
- Average score: ${statsResult[0]?.averageGrammarScore || 0}
- Completed lessons: ${completedLessonIds.length}
- Available lessons: ${availableLessons.map((l) => `${l.title} (${l.category}, ${l.cefrLevel})`).join(', ')}`;

  const chatMessages: ChatMessage[] = [
    { role: 'system', content: learningPathPrompt },
    { role: 'user', content: context },
  ];

  const response = await chatCompletion({
    model: 'gpt-4o',
    messages: chatMessages,
    temperature: 0.5,
    maxTokens: 2048,
  });

  let result: LearningPathResult;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    result = jsonMatch ? JSON.parse(jsonMatch[0]) : getDefaultPath(user);
  } catch {
    result = getDefaultPath(user);
  }

  return result;
}

function getDefaultPath(user: any): LearningPathResult {
  const baseLessons: LearningPathLesson[] = [
    {
      id: uuidv4(),
      title: 'Greetings and Introductions',
      category: 'vocabulary',
      level: 'A1',
      order: 1,
      estimatedMinutes: 15,
      description: 'Learn basic greetings and introductions',
    },
    {
      id: uuidv4(),
      title: 'Basic Present Tense',
      category: 'grammar',
      level: 'A1',
      order: 2,
      estimatedMinutes: 20,
      description: 'Understand and use the simple present tense',
    },
    {
      id: uuidv4(),
      title: 'Everyday Conversations',
      category: 'conversation',
      level: 'A1',
      order: 3,
      estimatedMinutes: 25,
      description: 'Practice common daily conversation scenarios',
    },
  ];

  return {
    path: baseLessons,
    totalEstimatedHours: 1.5,
    milestones: [
      { afterLessons: 3, achievement: 'Can introduce yourself and have basic conversations' },
    ],
  };
}
