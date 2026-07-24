export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string;
  cefrLevel: string;
  accentPreference: string;
  learningGoal: string;
  interests: string[];
  streak: number;
  xp: number;
  subscriptionTier: string;
}

export interface Avatar {
  id: string;
  name: string;
  language: string;
  accent: string;
  personality: string;
  backstory: string;
  imageUrl: string;
  style: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  audioUrl?: string;
  feedback?: {
    grammarScore: number;
    pronunciationScore: number;
    suggestions: string[];
  };
  timestamp: Date;
}

export interface Conversation {
  id: string;
  avatarId: string;
  avatar?: Avatar;
  lessonId?: string;
  mode: "lesson" | "freetalk" | "practice" | "multimodal";
  messages: Message[];
  duration: number;
  score: number;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  cefrLevel: string;
  orderIndex: number;
  isPublished: boolean;
  estimatedMinutes: number;
  status?: "not_started" | "in_progress" | "completed";
}

export interface DictionaryWord {
  id: string;
  word: string;
  translation: string;
  language: string;
  context: string;
  reviewCount: number;
  nextReviewAt?: Date;
}

export interface UserStats {
  totalMinutesLearned: number;
  totalSessions: number;
  totalWordsLearned: number;
  averagePronunciationScore: number;
  averageGrammarScore: number;
  currentStreak: number;
  longestStreak: number;
}

export interface DailyActivity {
  date: string;
  minutes: number;
  words: number;
  lessonsCompleted?: number;
}

export interface TopicCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}
