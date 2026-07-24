"use client";

import { cn } from "@/lib/utils";
import { MessageSquare, BookOpen, Trophy } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

interface Activity {
  id: string;
  type: "conversation" | "lesson" | "achievement";
  title: string;
  time: string;
  score?: number;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const { t } = useI18n();

  const getIcon = (type: string) => {
    switch (type) {
      case "conversation":
        return <MessageSquare size={16} className="text-teal-400" />;
      case "lesson":
        return <BookOpen size={16} className="text-purple-400" />;
      case "achievement":
        return <Trophy size={16} className="text-amber-400" />;
      default:
        return <MessageSquare size={16} className="text-slate-400" />;
    }
  };

  const displayActivities = activities.length > 0 ? activities : [];

  return (
    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      <h3 className="text-sm font-medium text-slate-400 mb-4">
        {t.dashboard.recentActivity}
      </h3>

      <div className="space-y-3">
        {displayActivities.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            —
          </p>
        ) : (
          displayActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
              {activity.score !== undefined && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    activity.score >= 90
                      ? "bg-emerald-500/20 text-emerald-400"
                      : activity.score >= 70
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-rose-500/20 text-rose-400"
                  )}
                >
                  {activity.score}%
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
