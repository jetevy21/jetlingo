"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Play, Clock, BookOpen } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface DailyLessonProps {
  title: string;
  description: string;
  duration: number;
  category: string;
  href?: string;
}

export default function DailyLesson({
  title,
  description,
  duration,
  category,
  href = "/dashboard/lessons",
}: DailyLessonProps) {
  const { t } = useI18n();

  return (
    <div className="p-6 bg-gradient-to-br from-teal-500/20 to-teal-600/10 rounded-2xl border border-teal-500/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="text-sm font-medium text-teal-400">{t.dashboard.dailyLesson}</span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-4">{description}</p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock size={14} />
          <span className="text-xs">{duration} {t.dashboard.min}</span>
        </div>
        <span className="px-2 py-0.5 bg-slate-700/50 rounded-full text-xs text-slate-400">
          {category}
        </span>
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium hover:bg-teal-400 transition-colors"
      >
        <Play size={16} />
        {t.dashboard.startLesson}
      </Link>
    </div>
  );
}
