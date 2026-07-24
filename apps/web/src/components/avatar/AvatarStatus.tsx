"use client";

import { cn } from "@/lib/utils";

type AvatarState = "idle" | "speaking" | "listening" | "thinking";

interface AvatarStatusProps {
  state: AvatarState;
  className?: string;
}

const stateConfig = {
  idle: {
    label: "Idle",
    color: "bg-slate-500",
    textColor: "text-slate-400",
  },
  speaking: {
    label: "Speaking",
    color: "bg-teal-500",
    textColor: "text-teal-400",
  },
  listening: {
    label: "Listening",
    color: "bg-amber-500",
    textColor: "text-amber-400",
  },
  thinking: {
    label: "Thinking",
    color: "bg-purple-500",
    textColor: "text-purple-400",
  },
};

export default function AvatarStatus({ state, className }: AvatarStatusProps) {
  const config = stateConfig[state];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2 h-2 rounded-full", config.color)}>
        {state === "speaking" && (
          <div className={cn("w-full h-full rounded-full animate-ping", config.color)} />
        )}
      </div>
      <span className={cn("text-xs font-medium", config.textColor)}>
        {config.label}
      </span>
    </div>
  );
}
