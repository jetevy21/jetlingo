"use client";

import { cn } from "@/lib/utils";
import { Lesson } from "@/types";
import { lessonsData } from "@/data/lessons";
import { tutors } from "@/data/tutors";
import { Clock, CheckCircle2, Circle, Play } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lessonId: string) => void;
}

export default function LessonCard({ lesson, onStart }: LessonCardProps) {
  const { t } = useI18n();
  const lessonData = lessonsData[lesson.id];
  const tutor = lessonData ? tutors.find((t) => t.id === lessonData.tutorId) : undefined;

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={20} className="text-emerald-400" />;
      case "in_progress":
        return (
          <div className="w-5 h-5 rounded-full border-2 border-teal-400 flex items-center justify-center">
            <div className="w-2 h-2 bg-teal-400 rounded-full" />
          </div>
        );
      default:
        return <Circle size={20} className="text-slate-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Grammaire: "bg-purple-500/20 text-purple-400",
      Grammar: "bg-purple-500/20 text-purple-400",
      Vocabulaire: "bg-blue-500/20 text-blue-400",
      Vocabulary: "bg-blue-500/20 text-blue-400",
      Conversation: "bg-teal-500/20 text-teal-400",
      Prononciation: "bg-pink-500/20 text-pink-400",
      Pronunciation: "bg-pink-500/20 text-pink-400",
      Examen: "bg-amber-500/20 text-amber-400",
      "Exam Prep": "bg-amber-500/20 text-amber-400",
    };
    return colors[category] || "bg-slate-500/20 text-slate-400";
  };

  const getCEFRColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: "bg-green-500/20 text-green-400",
      A2: "bg-emerald-500/20 text-emerald-400",
      B1: "bg-yellow-500/20 text-yellow-400",
      B2: "bg-amber-500/20 text-amber-400",
      C1: "bg-orange-500/20 text-orange-400",
      C2: "bg-red-500/20 text-red-400",
    };
    return colors[level] || "bg-slate-500/20 text-slate-400";
  };

  return (
    <div
      className={cn(
        "p-4 rounded-2xl border transition-all duration-200 group",
        lesson.status === "completed"
          ? "bg-slate-800/30 border-slate-700/30"
          : "bg-slate-800/50 border-slate-700/50 hover:border-teal-500/50"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              getCategoryColor(lesson.category)
            )}
          >
            {lesson.category}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              getCEFRColor(lesson.cefrLevel)
            )}
          >
            {lesson.cefrLevel}
          </span>
        </div>
        {getStatusIcon(lesson.status)}
      </div>

      <h3 className="text-base font-medium text-white mb-1">{lesson.title}</h3>
      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
        {lesson.description}
      </p>

      {tutor && (
        <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-slate-700/30 rounded-lg">
          <span className="text-lg">{tutor.avatar}</span>
          <span className="text-xs text-slate-400">{tutor.name}</span>
          <span className="text-xs text-slate-500">•</span>
          <span className="text-xs text-slate-500">{tutor.specialty}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock size={14} />
          <span className="text-xs">{lesson.estimatedMinutes} min</span>
        </div>

        {lesson.status !== "completed" && (
          <button
            onClick={() => onStart(lesson.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-medium hover:bg-teal-500/20 transition-colors"
          >
            <Play size={12} />
            {lesson.status === "in_progress" ? t.lessons.continueLesson : t.lessons.startLesson}
          </button>
        )}
      </div>

      {lesson.status === "in_progress" && (
        <div className="mt-3">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: "45%" }} />
          </div>
        </div>
      )}
    </div>
  );
}
