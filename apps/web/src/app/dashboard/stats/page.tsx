"use client";

import { useProgress } from "@/hooks/useProgress";
import StatsCard from "@/components/dashboard/StatsCard";
import ProgressChart from "@/components/dashboard/ProgressChart";
import StreakWidget from "@/components/dashboard/StreakWidget";
import { useI18n } from "@/hooks/useI18n";
import {
  Clock,
  BookOpen,
  MessageSquare,
  Flame,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";

export default function StatsPage() {
  const { stats, activity } = useProgress();
  const { t } = useI18n();

  const skillBreakdown = [
    { name: t.stats.speaking, score: stats?.averagePronunciationScore || 0 },
    { name: t.stats.listening, score: stats?.averagePronunciationScore || 0 },
    { name: t.stats.vocabulary, score: stats?.totalWordsLearned || 0 },
    { name: t.stats.grammar, score: stats?.averageGrammarScore || 0 },
  ];

  const milestones = [
    { title: t.stats.milestones.firstConversation, achieved: (stats?.totalSessions || 0) >= 1 },
    { title: t.stats.milestones.streak7, achieved: (stats?.currentStreak || 0) >= 7 },
    { title: t.stats.milestones.words100, achieved: (stats?.totalWordsLearned || 0) >= 100 },
    { title: t.stats.milestones.sessions50, achieved: (stats?.totalSessions || 0) >= 50 },
    { title: t.stats.milestones.perfectScore, achieved: (stats?.averagePronunciationScore || 0) >= 95 },
    { title: t.stats.milestones.streak30, achieved: (stats?.currentStreak || 0) >= 30 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">
          {t.stats.title}
        </h1>
        <p className="text-slate-400 mt-1">
          {t.stats.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t.stats.totalMinutes}
          value={stats?.totalMinutesLearned || 0}
          icon={Clock}
          color="teal"
        />
        <StatsCard
          title={t.stats.totalSessions}
          value={stats?.totalSessions || 0}
          icon={MessageSquare}
          color="purple"
        />
        <StatsCard
          title={t.stats.wordsLearned}
          value={stats?.totalWordsLearned || 0}
          icon={BookOpen}
          color="amber"
        />
        <StatsCard
          title={t.stats.currentStreak}
          value={`${stats?.currentStreak || 0} ${t.stats.days}`}
          icon={Flame}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart data={activity} />

        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            {t.stats.skillBreakdown}
          </h3>
          <div className="space-y-4">
            {skillBreakdown.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{skill.name}</span>
                  <span className="text-sm font-medium text-white">
                    {skill.score}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StreakWidget
          currentStreak={stats?.currentStreak || 0}
          longestStreak={stats?.longestStreak || 0}
        />

        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            {t.stats.achievements}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.title}
                className={`p-3 rounded-xl border ${
                  milestone.achieved
                    ? "bg-teal-500/10 border-teal-500/30"
                    : "bg-slate-800/30 border-slate-700/30 opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award
                    size={16}
                    className={
                      milestone.achieved ? "text-teal-400" : "text-slate-500"
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      milestone.achieved ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {milestone.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={20} className="text-teal-400" />
          <h3 className="text-sm font-medium text-slate-400">
            {t.stats.weeklyProgress}
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {(() => {
            const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
            const now = new Date();
            const last7Days = Array.from({ length: 7 }, (_, i) => {
              const d = new Date(now);
              d.setDate(d.getDate() - (6 - i));
              return d.toISOString().split("T")[0];
            });
            const maxMinutes = Math.max(
              1,
              ...last7Days.map((date) => {
                const entry = activity.find((a) => a.date === date);
                return entry?.minutes || 0;
              })
            );
            return last7Days.map((date) => {
              const entry = activity.find((a) => a.date === date);
              const minutes = entry?.minutes || 0;
              const pct = Math.round((minutes / maxMinutes) * 100);
              const d = new Date(date + "T12:00:00");
              return (
                <div key={date} className="text-center">
                  <div className="h-20 bg-slate-700/50 rounded-lg mb-2 flex items-end">
                    <div
                      className="w-full bg-teal-500/60 rounded-b-lg transition-all"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{dayNames[d.getDay()]}</span>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
