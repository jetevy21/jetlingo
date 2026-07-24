"use client";

import Avatar from "@/components/ui/Avatar";
import { ArrowLeft, Clock, MoreVertical, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface ConversationHeaderProps {
  avatarName: string;
  avatarImage?: string;
  mode: string;
  onBack?: () => void;
  onEndSession?: () => void;
  onToggleSidebar?: () => void;
}

export default function ConversationHeader({
  avatarName,
  avatarImage,
  mode,
  onBack,
  onEndSession,
  onToggleSidebar,
}: ConversationHeaderProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="h-16 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <Avatar
          name={avatarName}
          imageUrl={avatarImage}
          size="sm"
        />

        <div>
          <h3 className="text-sm font-medium text-white">{avatarName}</h3>
          <p className="text-xs text-slate-400 capitalize">{mode}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={16} />
          <span className="text-sm font-mono">{formatTime(elapsed)}</span>
        </div>

        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden lg:flex"
        >
          <BookOpen size={20} />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>

        <button
          onClick={onEndSession}
          className="px-4 py-2 bg-rose-500/10 text-rose-400 rounded-xl text-sm font-medium hover:bg-rose-500/20 transition-colors"
        >
          End Session
        </button>
      </div>
    </header>
  );
}
