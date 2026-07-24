"use client";

import { useState, useEffect, useCallback } from "react";
import { UserStats, DailyActivity } from "@/types";
import { lessonsData } from "@/data/lessons";

interface LessonRecord {
  lessonId: string;
  completedAt: number;
  duration: number;
  score: number;
}

interface PronunciationScore {
  score: number;
  text: string;
  timestamp: number;
}

const ACTIVITY_KEY = "jetlingo-activity";
const RECORDS_KEY = "jetlingo-lesson-records";

function getActivity(): DailyActivity[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ACTIVITY_KEY);
  if (stored) return JSON.parse(stored);

  const data: DailyActivity[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      minutes: 0,
      words: 0,
      lessonsCompleted: 0,
    });
  }
  return data;
}

function saveActivity(activity: DailyActivity[]) {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
}

function getRecords(): LessonRecord[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECORDS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRecords(records: LessonRecord[]) {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

function getPronunciationScores(): PronunciationScore[] {
  if (typeof window === "undefined") return [];
  const scores: PronunciationScore[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("jetlingo-pronunciation-")) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        Object.values(data).forEach((stepScores: any) => {
          if (Array.isArray(stepScores)) {
            stepScores.forEach((s: any) => {
              if (s.score && s.timestamp) {
                scores.push({ score: s.score, text: s.text || "", timestamp: s.timestamp });
              }
            });
          }
        });
      } catch {}
    }
  }
  return scores;
}

function countLessonWords(lessonId: string): number {
  const lesson = lessonsData[lessonId];
  if (!lesson) return 0;
  let count = 0;
  for (const step of lesson.steps) {
    if (step.type === "vocabulary" && step.items) {
      count += step.items.length;
    }
  }
  return count;
}

function countTotalWordsLearned(records: LessonRecord[]): number {
  const uniqueLessons = new Set(records.map((r) => r.lessonId));
  let total = 0;
  uniqueLessons.forEach((id) => {
    total += countLessonWords(id);
  });
  return total;
}

export function recordLessonCompletion(lessonId: string, duration: number, score: number) {
  const records = getRecords();
  records.push({
    lessonId,
    completedAt: Date.now(),
    duration: Math.max(1, Math.round(duration)),
    score,
  });
  saveRecords(records);

  const activity = getActivity();
  const today = new Date().toISOString().split("T")[0];
  let todayEntry = activity.find((a) => a.date === today);

  const wordsFromLesson = countLessonWords(lessonId);

  if (todayEntry) {
    todayEntry.minutes += Math.max(1, Math.round(duration));
    todayEntry.words += wordsFromLesson;
    todayEntry.lessonsCompleted = (todayEntry.lessonsCompleted || 0) + 1;
  } else {
    activity.push({
      date: today,
      minutes: Math.max(1, Math.round(duration)),
      words: wordsFromLesson,
      lessonsCompleted: 1,
    });
    todayEntry = activity[activity.length - 1];
  }

  saveActivity(activity);
  return todayEntry;
}

export function recordPronunciationPractice(durationMinutes: number, wordsAttempted: number) {
  const activity = getActivity();
  const today = new Date().toISOString().split("T")[0];
  const todayEntry = activity.find((a) => a.date === today);

  if (todayEntry) {
    todayEntry.minutes += durationMinutes;
    todayEntry.words += wordsAttempted;
  } else {
    activity.push({
      date: today,
      minutes: durationMinutes,
      words: wordsAttempted,
      lessonsCompleted: 0,
    });
  }

  saveActivity(activity);
}

export function useProgress() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activity, setActivity] = useState<DailyActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(() => {
    const records = getRecords();
    const activityData = getActivity();
    const pronunciationScores = getPronunciationScores();

    const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0);
    const lessonSessions = records.length;
    const pronunciationSessions = pronunciationScores.length;
    const totalSessions = lessonSessions + pronunciationSessions;

    const avgScore = records.length > 0
      ? Math.round(records.reduce((sum, r) => sum + r.score, 0) / records.length)
      : 0;

    const wordsLearned = countTotalWordsLearned(records);

    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayActivity = activityData.find((a) => a.date === dateStr);
      if (dayActivity && dayActivity.minutes > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    setStats({
      totalMinutesLearned: totalMinutes,
      totalSessions: totalSessions,
      totalWordsLearned: wordsLearned,
      averagePronunciationScore: avgScore,
      averageGrammarScore: avgScore,
      currentStreak: streak,
      longestStreak: streak,
    });
    setActivity(activityData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadStats();

    const handleFocus = () => loadStats();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") loadStats();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [loadStats]);

  return { stats, activity, isLoading, refresh: loadStats };
}
