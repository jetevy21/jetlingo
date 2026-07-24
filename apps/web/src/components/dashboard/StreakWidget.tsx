"use client";

import { cn } from "@/lib/utils";
import { Flame, Calendar } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface StreakWidgetProps {
  currentStreak: number;
  longestStreak: number;
  calendarData?: boolean[];
}

export default function StreakWidget({
  currentStreak,
  longestStreak,
  calendarData,
}: StreakWidgetProps) {
  const { t } = useI18n();
  const defaultCalendar = Array(30)
    .fill(null)
    .map(() => Math.random() > 0.3);
  const calendar = calendarData || defaultCalendar;

  const getMessage = (streak: number) => {
    if (streak >= 30) return "Légendaire !";
    if (streak >= 21) return "Incroyable !";
    if (streak >= 14) return "Imparable !";
    if (streak >= 7) return "Une semaine !";
    if (streak >= 3) return "En marche !";
    return "Commencez aujourd'hui !";
  };

  return (
    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400">{t.dashboard.dailyStreak}</h3>
        <Flame size={18} className="text-amber-500" />
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-white">{currentStreak}</span>
        <span className="text-sm text-slate-400 mb-1">{t.dashboard.days}</span>
      </div>

      <p className="text-xs text-amber-400 mb-4">
        🔥 {getMessage(currentStreak)}
      </p>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-slate-500" />
          <span className="text-xs text-slate-500">{t.dashboard.last30days}</span>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {calendar.map((active, i) => (
            <div
              key={i}
              className={cn(
                "w-full aspect-square rounded-sm transition-colors",
                active
                  ? "bg-amber-500"
                  : "bg-slate-700/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{t.dashboard.longestStreak}</span>
          <span className="text-sm font-medium text-white">
            {longestStreak} {t.dashboard.days}
          </span>
        </div>
      </div>
    </div>
  );
}
