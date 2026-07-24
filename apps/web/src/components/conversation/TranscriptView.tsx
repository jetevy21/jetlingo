"use client";

import { Message } from "@/types";
import { cn } from "@/lib/utils";

interface TranscriptViewProps {
  messages: Message[];
}

export default function TranscriptView({ messages }: TranscriptViewProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
        Transcript
      </h3>
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "p-3 rounded-lg",
              message.role === "user"
                ? "bg-teal-500/10 border-l-2 border-teal-500"
                : "bg-slate-800/50 border-l-2 border-slate-600"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  message.role === "user"
                    ? "text-teal-400"
                    : "text-slate-400"
                )}
              >
                {message.role === "user" ? "You" : "AI"}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm text-slate-200">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
