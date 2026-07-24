import { chatCompletion, streamingChatCompletion, ChatMessage } from '../services/openai.js';
import { getMemory, LearnerContext } from '../services/memory.js';
import { lessonSystemPrompt, buildLessonMessages } from '../utils/prompts.js';

interface LessonAgentInput {
  userId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  avatarPersonality?: string;
  targetLanguage?: string;
  cefrLevel?: string;
}

export async function generateLessonResponse(input: LessonAgentInput): Promise<string> {
  const memory = await getMemory(input.userId);

  const contextStr = memory
    ? `Level: ${memory.level}
Goals: ${memory.goals}
Interests: ${memory.interests.join(', ')}
Words learned: ${memory.wordsLearned.slice(-20).join(', ')}
Conversation count: ${memory.conversationCount}`
    : '';

  const personalityBlock = input.avatarPersonality
    ? `\nYour personality: ${input.avatarPersonality}. Match this tone in your responses.`
    : '';

  const levelBlock = input.cefrLevel
    ? `\nLearner's CEFR level: ${input.cefrLevel}. Adjust complexity accordingly.`
    : '';

  const systemPrompt = lessonSystemPrompt + personalityBlock + levelBlock;

  const chatMessages: ChatMessage[] = buildLessonMessages(
    systemPrompt,
    input.messages,
    contextStr
  );

  const response = await chatCompletion({
    model: 'gpt-4o',
    messages: chatMessages,
    temperature: 0.8,
    maxTokens: 1024,
  });

  return response;
}

export async function generateStreamingLessonResponse(
  input: LessonAgentInput
) {
  const memory = await getMemory(input.userId);

  const contextStr = memory
    ? `Level: ${memory.level}
Goals: ${memory.goals}
Interests: ${memory.interests.join(', ')}
Words learned: ${memory.wordsLearned.slice(-20).join(', ')}`
    : '';

  const personalityBlock = input.avatarPersonality
    ? `\nYour personality: ${input.avatarPersonality}. Match this tone in your responses.`
    : '';

  const systemPrompt = lessonSystemPrompt + personalityBlock;

  const chatMessages: ChatMessage[] = buildLessonMessages(
    systemPrompt,
    input.messages,
    contextStr
  );

  return streamingChatCompletion({
    model: 'gpt-4o',
    messages: chatMessages,
    temperature: 0.8,
    maxTokens: 1024,
  });
}
