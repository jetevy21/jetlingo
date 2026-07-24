import { z } from 'zod';
import { CEFR_LEVELS, LANGUAGES, LEARNING_GOALS } from './constants';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  nativeLanguage: z.enum(LANGUAGES),
  learningLanguage: z.enum(LANGUAGES),
  learningGoal: z.enum(LEARNING_GOALS),
});

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1, 'Message cannot be empty').max(5000),
  audioUrl: z.string().url().optional(),
});

export const createConversationSchema = z.object({
  avatarId: z.string().uuid(),
  topic: z.string().min(1, 'Topic is required').max(200),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(CEFR_LEVELS),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  nativeLanguage: z.enum(LANGUAGES).optional(),
  learningLanguage: z.enum(LANGUAGES).optional(),
  learningGoal: z.enum(LEARNING_GOALS).optional(),
  currentLevel: z.enum(CEFR_LEVELS).optional(),
});

export const createDictionaryWordSchema = z.object({
  word: z.string().min(1, 'Word is required').max(200),
  translation: z.string().min(1, 'Translation is required').max(200),
  language: z.enum(LANGUAGES),
  example: z.string().min(1, 'Example is required').max(1000),
  notes: z.string().max(1000).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateDictionaryWordInput = z.infer<typeof createDictionaryWordSchema>;
