"use client";

import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface FeedbackPanelProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: {
    pronunciationScore: number;
    grammarScore: number;
    suggestions: string[];
  };
}

export default function FeedbackPanel({
  isOpen,
  onClose,
  feedback,
}: FeedbackPanelProps) {
  if (!isOpen) return null;

  const overallScore = Math.round(
    (feedback.pronunciationScore + feedback.grammarScore) / 2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-sm h-full bg-slate-900 border-l border-slate-700 p-6 overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Feedback</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${overallScore * 2.83} 283`}
                  className={cn(
                    overallScore >= 80
                      ? "text-emerald-500"
                      : overallScore >= 60
                      ? "text-amber-500"
                      : "text-rose-500"
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {overallScore}
                </span>
                <span className="text-xs text-slate-400">Overall</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="text-center">
                <div
                  className={cn(
                    "text-2xl font-bold",
                    feedback.pronunciationScore >= 80
                      ? "text-emerald-400"
                      : feedback.pronunciationScore >= 60
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {feedback.pronunciationScore}%
                </div>
                <div className="text-xs text-slate-400 mt-1">Pronunciation</div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="text-center">
                <div
                  className={cn(
                    "text-2xl font-bold",
                    feedback.grammarScore >= 80
                      ? "text-emerald-400"
                      : feedback.grammarScore >= 60
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {feedback.grammarScore}%
                </div>
                <div className="text-xs text-slate-400 mt-1">Grammar</div>
              </div>
            </div>
          </div>

          {feedback.suggestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-300">
                Suggestions
              </h3>
              <div className="space-y-2">
                {feedback.suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 bg-slate-800/30 rounded-lg"
                  >
                    <AlertCircle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">
                Great job! Keep practicing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
