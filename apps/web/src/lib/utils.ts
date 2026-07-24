import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getCEFRColor(level: string): string {
  const colors: Record<string, string> = {
    A1: "bg-green-500/20 text-green-400",
    A2: "bg-emerald-500/20 text-emerald-400",
    B1: "bg-yellow-500/20 text-yellow-400",
    B2: "bg-amber-500/20 text-amber-400",
    C1: "bg-orange-500/20 text-orange-400",
    C2: "bg-red-500/20 text-red-400",
  };
  return colors[level] || "bg-gray-500/20 text-gray-400";
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Grammar: "bg-purple-500/20 text-purple-400",
    Vocabulary: "bg-blue-500/20 text-blue-400",
    Conversation: "bg-teal-500/20 text-teal-400",
    Pronunciation: "bg-pink-500/20 text-pink-400",
    "Exam Prep": "bg-amber-500/20 text-amber-400",
  };
  return colors[category] || "bg-gray-500/20 text-gray-400";
}
