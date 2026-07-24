"use client";

import { cn } from "@/lib/utils";
import { MessageSquare, Sparkles } from "lucide-react";

interface FreeTalkModeProps {
  onStart: () => void;
}

export default function FreeTalkMode({ onStart }: FreeTalkModeProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl border border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <MessageSquare size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Free Talk Mode</h3>
          <p className="text-sm text-slate-400">
            Practice spontaneous conversation
          </p>
        </div>
      </div>

      <p className="text-slate-400 mb-4">
        Have an open-ended conversation on any topic. Perfect for practicing
        your fluency and natural expression.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-purple-400" />
        <span className="text-sm text-purple-400">
          AI adapts to your level automatically
        </span>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-400 transition-colors"
      >
        Start Free Conversation
      </button>
    </div>
  );
}
