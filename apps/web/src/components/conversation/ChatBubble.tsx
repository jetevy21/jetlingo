"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types";
import Avatar from "@/components/ui/Avatar";
import { MessageSquare, Volume2 } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
  avatarName?: string;
  onFeedback?: (messageId: string) => void;
}

export default function ChatBubble({
  message,
  avatarName = "AI",
  onFeedback,
}: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && (
        <Avatar
          name={avatarName}
          size="sm"
          className="mt-1 flex-shrink-0"
        />
      )}

      <div
        className={cn(
          "max-w-[80%] space-y-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-teal-500 text-white rounded-tr-sm"
              : "bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-tl-sm"
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 text-xs text-slate-500",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {!isUser && (
            <>
              <button
                onClick={() => {}}
                className="hover:text-teal-400 transition-colors"
              >
                <Volume2 size={14} />
              </button>
              <button
                onClick={() => onFeedback?.(message.id)}
                className="hover:text-teal-400 transition-colors"
              >
                <MessageSquare size={14} />
              </button>
            </>
          )}
        </div>

        {message.feedback && (
          <div className="mt-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Pronunciation:</span>
                <span className="text-xs font-medium text-teal-400">
                  {message.feedback.pronunciationScore}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Grammar:</span>
                <span className="text-xs font-medium text-amber-400">
                  {message.feedback.grammarScore}%
                </span>
              </div>
            </div>
            {message.feedback.suggestions.length > 0 && (
              <div className="space-y-1">
                {message.feedback.suggestions.map((suggestion, i) => (
                  <p key={i} className="text-xs text-slate-400">
                    💡 {suggestion}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
