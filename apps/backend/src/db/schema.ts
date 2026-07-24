import { pgTable, text, timestamp, integer, real, boolean, jsonb, uuid, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  nativeLanguage: text('native_language').notNull().default('en'),
  targetLanguage: text('target_language').notNull().default('en'),
  cefrLevel: text('cefr_level').notNull().default('A1'),
  accentPreference: text('accent_preference').notNull().default('american'),
  learningGoal: text('learning_goal').default('travel'),
  interests: text('interests').array().default([]),
  streak: integer('streak').notNull().default(0),
  lastActiveAt: timestamp('last_active_at'),
  xp: integer('xp').notNull().default(0),
  subscriptionTier: text('subscription_tier').notNull().default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const avatars = pgTable('avatars', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  language: text('language').notNull(),
  accent: text('accent').notNull(),
  personality: text('personality').notNull(),
  backstory: text('backstory').notNull(),
  imageUrl: text('image_url').notNull(),
  voiceId: text('voice_id').notNull(),
  style: text('style').notNull().default('casual'),
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  avatarId: uuid('avatar_id').notNull().references(() => avatars.id),
  lessonId: uuid('lesson_id'),
  mode: text('mode').notNull().default('freetalk'),
  messages: jsonb('messages').notNull().default([]),
  duration: integer('duration').notNull().default(0),
  score: real('score'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  language: text('language').notNull(),
  category: text('category').notNull(),
  cefrLevel: text('cefr_level').notNull(),
  content: jsonb('content').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id),
  status: text('status').notNull().default('not_started'),
  score: real('score'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const dictionary = pgTable('dictionary', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  word: text('word').notNull(),
  translation: text('translation').notNull(),
  language: text('language').notNull(),
  context: text('context').notNull(),
  audioUrl: text('audio_url'),
  reviewCount: integer('review_count').notNull().default(0),
  nextReviewAt: timestamp('next_review_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userStats = pgTable('user_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  totalMinutesLearned: integer('total_minutes_learned').notNull().default(0),
  totalSessions: integer('total_sessions').notNull().default(0),
  totalWordsLearned: integer('total_words_learned').notNull().default(0),
  averagePronunciationScore: real('average_pronunciation_score').notNull().default(0),
  averageGrammarScore: real('average_grammar_score').notNull().default(0),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  weeklyMinutes: jsonb('weekly_minutes').notNull().default({ mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  paypalSubscriptionId: text('paypal_subscription_id').notNull().unique(),
  planId: text('plan_id').notNull(),
  tier: text('tier').notNull(),
  status: text('status').notNull().default('active'),
  startDate: timestamp('start_date').defaultNow().notNull(),
  nextBillingDate: timestamp('next_billing_date'),
  cancelDate: timestamp('cancel_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
