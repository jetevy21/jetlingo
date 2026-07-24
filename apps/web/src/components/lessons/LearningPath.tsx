"use client";

import { cn } from "@/lib/utils";
import { Lesson } from "@/types";
import { CheckCircle2, Circle, Lock } from "lucide-react";

interface LearningPathProps {
  lessons: Lesson[];
  onLessonClick: (lessonId: string) => void;
}

export default function LearningPath({ lessons, onLessonClick }: LearningPathProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700/50" />

      <div className="space-y-6">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.status === "completed";
          const isInProgress = lesson.status === "in_progress";
          const isLocked = lesson.status === "not_started" && index > 0 && !lessons[index - 1].status;

          return (
            <div
              key={lesson.id}
              className="relative flex items-start gap-4"
            >
              <div className="relative z-10 flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 size={24} className="text-emerald-400" />
                ) : isInProgress ? (
                  <div className="w-6 h-6 rounded-full border-2 border-teal-400 flex items-center justify-center bg-slate-900">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                  </div>
                ) : isLocked ? (
                  <Lock size={24} className="text-slate-600" />
                ) : (
                  <Circle size={24} className="text-slate-500" />
                )}
              </div>

              <div
                className={cn(
                  "flex-1 p-4 rounded-2xl border transition-all duration-200",
                  isCompleted
                    ? "bg-slate-800/30 border-slate-700/30"
                    : isInProgress
                    ? "bg-teal-500/10 border-teal-500/30"
                    : isLocked
                    ? "bg-slate-800/20 border-slate-700/20 opacity-60"
                    : "bg-slate-800/50 border-slate-700/50 hover:border-teal-500/50 cursor-pointer"
                )}
                onClick={() => !isLocked && onLessonClick(lesson.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500">
                    Lesson {index + 1}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-500">
                    {lesson.estimatedMinutes} min
                  </span>
                </div>
                <h3
                  className={cn(
                    "font-medium",
                    isCompleted
                      ? "text-slate-400"
                      : isInProgress
                      ? "text-white"
                      : isLocked
                      ? "text-slate-500"
                      : "text-white"
                  )}
                >
                  {lesson.title}
                </h3>
                <p
                  className={cn(
                    "text-sm mt-1",
                    isLocked ? "text-slate-600" : "text-slate-400"
                  )}
                >
                  {lesson.description}
                </p>

                {isInProgress && (
                  <div className="mt-3">
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all"
                        style={{ width: "45%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
