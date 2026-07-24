import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function calculateStreak(lastActiveAt: Date | null, currentStreak: number): number {
  if (!lastActiveAt) return 1;

  const now = new Date();
  const last = new Date(lastActiveAt);
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return currentStreak;
  if (diffDays === 1) return currentStreak + 1;
  return 1;
}

export function calculateLevel(xp: number): string {
  if (xp < 100) return 'A1';
  if (xp < 300) return 'A2';
  if (xp < 600) return 'B1';
  if (xp < 1000) return 'B2';
  if (xp < 1500) return 'C1';
  return 'C2';
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export function getWeeklyMinutesKey(): string {
  const day = new Date().getDay();
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[day];
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidCEFRLevel(level: string): boolean {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level);
}

export function paginate<T>(items: T[], page: number, limit: number): { data: T[]; total: number; page: number; totalPages: number } {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, total, page, totalPages };
}
