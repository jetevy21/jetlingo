"use client";

import { DailyActivity } from "@/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/useI18n";

interface ProgressChartProps {
  data: DailyActivity[];
  type?: "line" | "bar";
}

export default function ProgressChart({ data, type = "line" }: ProgressChartProps) {
  const { t } = useI18n();
  const maxValue = Math.max(...data.map((d) => d.minutes));
  const minValue = Math.min(...data.map((d) => d.minutes));

  const getHeight = (value: number) => {
    if (maxValue === minValue) return 50;
    return ((value - minValue) / (maxValue - minValue)) * 80 + 20;
  };

  const total = data.reduce((sum, d) => sum + d.minutes, 0);
  const avg = data.length > 0 ? Math.round(total / data.length) : 0;

  return (
    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      <h3 className="text-sm font-medium text-slate-400 mb-4">
        {t.dashboard.learningMinutes}
      </h3>

      <div className="flex items-end gap-1 h-32">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                "w-full rounded-t transition-all duration-300",
                i === data.length - 1
                  ? "bg-teal-500"
                  : "bg-teal-500/60 hover:bg-teal-400"
              )}
              style={{ height: `${getHeight(item.minutes)}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-slate-500">
          {data[0]?.date}
        </span>
        <span className="text-xs text-slate-500">
          {data[data.length - 1]?.date}
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500 rounded" />
          <span className="text-xs text-slate-400">
            {t.dashboard.total}: {total} {t.dashboard.min}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500/60 rounded" />
          <span className="text-xs text-slate-400">
            {t.dashboard.avg}: {avg} {t.dashboard.min}/jour
          </span>
        </div>
      </div>
    </div>
  );
}
