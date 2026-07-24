"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lesson } from "@/types";
import { lessonsData } from "@/data/lessons";
import { tutors } from "@/data/tutors";
import LessonCard from "@/components/lessons/LessonCard";
import CategoryFilter from "@/components/lessons/CategoryFilter";
import LearningPath from "@/components/lessons/LearningPath";
import Progress from "@/components/ui/Progress";
import { useI18n } from "@/hooks/useI18n";
import { useAuthStore } from "@/stores/authStore";
import { LayoutGrid, List, Globe } from "lucide-react";

const categoryKeys = ["Grammar", "Vocabulary", "Conversation", "Pronunciation", "Exam Prep"] as const;

const languageMap: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
};

const languageFlag: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇧🇷",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
};

export default function LessonsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { user } = useAuthStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "path">("path");
  const [targetLang, setTargetLang] = useState("en");

  useEffect(() => {
    const targetLang = user?.targetLanguage || "en";
    setTargetLang(targetLang);

    const completedIds: string[] = JSON.parse(localStorage.getItem("jetlingo-completed-lessons") || "[]");

    const allLessons = Object.values(lessonsData);
    const filteredLessons = allLessons.filter((l) => l.language === targetLang);

    const baseLessons: Lesson[] = filteredLessons.map((l) => ({
      id: l.id,
      title: l.title,
      description: l.description,
      language: languageMap[targetLang] || targetLang,
      category: l.category,
      cefrLevel: l.cefrLevel,
      orderIndex: l.id.startsWith("en-") ? parseInt(l.id.replace("en-", "")) : parseInt(l.id),
      isPublished: true,
      estimatedMinutes: l.estimatedMinutes,
    }));

    const withStatus = baseLessons.map((lesson, i) => {
      if (completedIds.includes(lesson.id)) {
        return { ...lesson, status: "completed" as const };
      }
      const prevCompleted = i === 0 || completedIds.includes(baseLessons[i - 1].id);
      if (prevCompleted && !completedIds.includes(lesson.id)) {
        return { ...lesson, status: "in_progress" as const };
      }
      return lesson;
    });
    setLessons(withStatus);
  }, []);

  const filteredLessons = selectedCategory
    ? lessons.filter((l) => l.category === selectedCategory)
    : lessons;

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const overallProgress = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const categories = categoryKeys.map((key) => t.lessons.categories[key]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            {t.lessons.title}
          </h1>
          <p className="text-slate-400 mt-1">
            {t.lessons.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <span className="text-lg">{languageFlag[targetLang]}</span>
            <span className="text-sm text-slate-300">{languageMap[targetLang]}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode("path")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "path"
                  ? "bg-teal-500/20 text-teal-400"
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-teal-500/20 text-teal-400"
                  : "bg-slate-800/50 text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">{t.lessons.overallProgress}</span>
          <span className="text-sm font-medium text-white">
            {completedCount}/{lessons.length} {t.lessons.lessonsCount}
          </span>
        </div>
        <Progress value={overallProgress} size="md" />
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <Globe size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">
            {t.lessons.noLessons || "Aucune leçon disponible pour cette langue."}
          </p>
        </div>
      ) : viewMode === "path" ? (
        <LearningPath
          lessons={filteredLessons}
          onLessonClick={(id) => router.push(`/dashboard/lessons/${id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onStart={(id) => router.push(`/dashboard/lessons/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
