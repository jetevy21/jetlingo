export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: Avatar;
  nativeLanguage: string;
  learningLanguage: string;
  currentLevel: string;
  learningGoal: string;
  subscription: string;
  streak: number;
  totalXp: number;
  createdAt: string;
  updatedAt: string;
}

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  accent: string;
  personality: string;
  style: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  pronunciationScore?: number;
  grammarCorrections?: GrammarCorrection[];
  vocabularySuggestions?: VocabularySuggestion[];
  audioUrl?: string;
  createdAt: string;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export interface VocabularySuggestion {
  word: string;
  translation: string;
  example: string;
  difficulty: string;
}

export interface Conversation {
  id: string;
  userId: string;
  avatarId: string;
  title: string;
  topic: string;
  category: string;
  level: string;
  messages: Message[];
  totalMessages: number;
  duration: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  content: LessonContent;
  order: number;
  xpReward: number;
  isLocked: boolean;
  prerequisites: string[];
}

export interface LessonContent {
  sections: LessonSection[];
}

export interface LessonSection {
  type: 'text' | 'exercise' | 'quiz' | 'audio';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: string;
}

export interface DictionaryWord {
  id: string;
  userId: string;
  word: string;
  translation: string;
  language: string;
  example: string;
  notes?: string;
  difficulty: string;
  isFavorite: boolean;
  reviewCount: number;
  nextReview: string;
  createdAt: string;
}

export interface UserStats {
  userId: string;
  totalXp: number;
  currentLevel: string;
  streak: number;
  longestStreak: number;
  lessonsCompleted: number;
  conversationsCompleted: number;
  wordsLearned: number;
  averageScore: number;
  totalPracticeTime: number;
  weeklyProgress: WeeklyProgress[];
}

export interface WeeklyProgress {
  day: string;
  xp: number;
  minutes: number;
  conversations: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  audioUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  nativeLanguage: string;
  learningLanguage: string;
  learningGoal: string;
}

export interface CreateConversationRequest {
  avatarId: string;
  topic: string;
  category: string;
  level: string;
}

export interface UpdateProfileRequest {
  name?: string;
  nativeLanguage?: string;
  learningLanguage?: string;
  learningGoal?: string;
  currentLevel?: string;
}

export interface CreateDictionaryWordRequest {
  word: string;
  translation: string;
  language: string;
  example: string;
  notes?: string;
}
