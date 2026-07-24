"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import StatsCard from "@/components/dashboard/StatsCard";
import StreakWidget from "@/components/dashboard/StreakWidget";
import DailyLesson from "@/components/dashboard/DailyLesson";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ProgressChart from "@/components/dashboard/ProgressChart";
import TutorialVideo from "@/components/dashboard/TutorialVideo";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  MessageSquare,
  Zap,
  ArrowRight,
  Play,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useI18n } from "@/hooks/useI18n";
import { lessonsData } from "@/data/lessons";
import { getUser } from "@/lib/auth";

function normalizeLang(lang: string | undefined): string {
  if (!lang) return "en";
  const map: Record<string, string> = { english: "en", spanish: "es", french: "fr", german: "de" };
  return map[lang.toLowerCase()] || lang;
}

function getRecentActivities(): any[] {
  if (typeof window === "undefined") return [];

  const records = JSON.parse(localStorage.getItem("jetlingo-lesson-records") || "[]");
  const completed = JSON.parse(localStorage.getItem("jetlingo-completed-lessons") || "[]");

  const activities: any[] = [];

  // Add lesson records
  records.slice(-5).forEach((record: any) => {
    activities.push({
      id: record.completedAt,
      type: "lesson",
      title: `Leçon ${record.lessonId} complétée`,
      time: new Date(record.completedAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score: record.score,
    });
  });

  // Add pronunciation records
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("jetlingo-pronunciation-")) {
      const scores = JSON.parse(localStorage.getItem(key) || "{}");
      Object.values(scores).forEach((stepScores: any) => {
        if (Array.isArray(stepScores)) {
          stepScores.slice(-2).forEach((s: any) => {
            activities.push({
              id: s.timestamp,
              type: "conversation",
              title: `Prononciation: "${s.text}"`,
              time: new Date(s.timestamp).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
              score: s.score,
            });
          });
        }
      });
    }
  }

  // Sort by time, most recent first
  activities.sort((a, b) => {
    const timeA = typeof a.id === "number" ? a.id : new Date(a.time).getTime();
    const timeB = typeof b.id === "number" ? b.id : new Date(b.time).getTime();
    return timeB - timeA;
  });

  return activities.slice(0, 5);
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { stats, activity } = useProgress();
  const { t } = useI18n();
  const [showTutorial, setShowTutorial] = useState(false);

  const recentActivities = getRecentActivities();

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = activity.find((a) => a.date === today);
  const todayMinutes = todayEntry?.minutes || 0;

  const targetLang = normalizeLang(user?.targetLanguage) || normalizeLang(getUser()?.targetLanguage) || "en";
  const completedIds: string[] = JSON.parse(localStorage.getItem("jetlingo-completed-lessons") || "[]");
  const allLessons = Object.values(lessonsData);
  const filteredLessons = allLessons.filter((l) => l.language === targetLang);
  const dailyLesson = filteredLessons.find((l) => !completedIds.includes(l.id)) || filteredLessons[0];

  const last7 = activity.slice(-7);
  const prev7 = activity.slice(-14, -7);
  const weekMinutes = last7.reduce((sum, d) => sum + d.minutes, 0);
  const prevWeekMinutes = prev7.reduce((sum, d) => sum + d.minutes, 0);
  const weekChange = prevWeekMinutes > 0
    ? Math.round(((weekMinutes - prevWeekMinutes) / prevWeekMinutes) * 100)
    : weekMinutes > 0 ? 100 : 0;

  const weekWords = last7.reduce((sum, d) => sum + d.words, 0);
  const prevWeekWords = prev7.reduce((sum, d) => sum + d.words, 0);
  const wordsChange = weekWords - prevWeekWords;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            {t.dashboard.welcome}, {user?.name?.split(" ")[0] || "Learner"} 👋
          </h1>
          <p className="text-slate-400 mt-1">
            {t.dashboard.welcomeSubtitle}
          </p>
        </div>

        <Link href="/dashboard/practice">
          <Button>
            <Zap size={16} className="mr-2" />
            {t.dashboard.startPractice}
          </Button>
        </Link>
      </div>

      {/* Tutorial Button */}
      <div className="p-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl border border-teal-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
            <div>
              <h3 className="text-base font-medium text-white">
                {targetLang === "fr" ? "Nouveau sur JetLingo?" : "New to JetLingo?"}
              </h3>
              <p className="text-sm text-slate-400">
                {targetLang === "fr" 
                  ? "Regardez ce tutoriel rapide pour apprendre à utiliser l'application." 
                  : "Watch this quick tutorial to learn how to use the app."}
              </p>
            </div>
          </div>
          <Button onClick={() => setShowTutorial(true)} variant="outline">
            <Play size={16} className="mr-2" />
            {targetLang === "fr" ? "Voir le tutoriel" : "Watch Tutorial"}
          </Button>
        </div>
      </div>

      <TutorialVideo
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
        language={targetLang}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatsCard
              title={t.dashboard.minutesToday}
              value={todayMinutes}
              change={`${weekChange >= 0 ? "+" : ""}${weekChange}% ${t.dashboard.vsLastWeek}`}
              icon={Clock}
              color="teal"
            />
            <StatsCard
              title={t.dashboard.wordsLearned}
              value={stats?.totalWordsLearned || 0}
              change={`+${wordsChange} ${t.dashboard.thisWeek}`}
              icon={BookOpen}
              color="amber"
            />
            <StatsCard
              title={t.dashboard.sessions}
              value={stats?.totalSessions || 0}
              change={``}
              icon={MessageSquare}
              color="purple"
            />
          </div>

          <DailyLesson
            title={dailyLesson?.title || t.dashboard.restaurantTitle}
            description={dailyLesson?.description || t.dashboard.restaurantDesc}
            duration={dailyLesson?.estimatedMinutes || 15}
            category={dailyLesson?.category || t.dashboard.conversation}
            href={`/dashboard/lessons/${dailyLesson?.id || (targetLang === "en" ? "en-1" : "1")}`}
          />

          <ProgressChart data={activity} />
        </div>

        <div className="space-y-6">
          <StreakWidget
            currentStreak={stats?.currentStreak || 0}
            longestStreak={stats?.longestStreak || 0}
          />

          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/practice"
          className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-white group-hover:text-teal-400 transition-colors">
                {t.dashboard.freeTalk}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {t.dashboard.freeTalkDesc}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-slate-500 group-hover:text-teal-400 transition-colors"
            />
          </div>
        </Link>

        <Link
          href="/dashboard/practice"
          className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-white group-hover:text-teal-400 transition-colors">
                {t.dashboard.practiceTopics}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {t.dashboard.practiceTopicsDesc}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-slate-500 group-hover:text-teal-400 transition-colors"
            />
          </div>
        </Link>

        <Link
          href="/dashboard/dictionary"
          className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-white group-hover:text-teal-400 transition-colors">
                {t.dashboard.reviewWords}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {t.dashboard.reviewWordsDesc}
              </p>
            </div>
            <ArrowRight
              size={20}
              className="text-slate-500 group-hover:text-teal-400 transition-colors"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
