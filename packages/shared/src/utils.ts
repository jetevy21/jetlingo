import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}

export function getCEFRColor(level: string): string {
  const colors: Record<string, string> = {
    A1: 'bg-green-500/20 text-green-400',
    A2: 'bg-green-500/20 text-green-300',
    B1: 'bg-yellow-500/20 text-yellow-400',
    B2: 'bg-orange-500/20 text-orange-400',
    C1: 'bg-red-500/20 text-red-400',
    C2: 'bg-purple-500/20 text-purple-400',
  };
  return colors[level] || 'bg-gray-500/20 text-gray-400';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    grammar: 'bg-blue-500/20 text-blue-400',
    vocabulary: 'bg-purple-500/20 text-purple-400',
    conversation: 'bg-teal-500/20 text-teal-400',
    pronunciation: 'bg-pink-500/20 text-pink-400',
    ielts: 'bg-amber-500/20 text-amber-400',
    toefl: 'bg-amber-500/20 text-amber-400',
    business: 'bg-indigo-500/20 text-indigo-400',
    travel: 'bg-cyan-500/20 text-cyan-400',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400';
}

export function getSubscriptionColor(tier: string): string {
  const colors: Record<string, string> = {
    free: 'bg-gray-500/20 text-gray-400',
    premium: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400',
    family: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400',
    lifetime: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400',
  };
  return colors[tier] || 'bg-gray-500/20 text-gray-400';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
