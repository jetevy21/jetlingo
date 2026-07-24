"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string) => void;
  onVoiceToggle?: () => void;
  isRecording?: boolean;
  isSending?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  onVoiceToggle,
  isRecording = false,
  isSending = false,
  placeholder = "Type your message...",
}: MessageInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isSending) {
      onSend(value.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-4">
      {isRecording && (
        <div className="flex items-center justify-center gap-2 mb-3 py-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-rose-500 rounded-full animate-waveform"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: "4px",
                }}
              />
            ))}
          </div>
          <span className="text-sm text-rose-400 font-medium">Listening...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {onVoiceToggle && (
          <button
            type="button"
            onClick={onVoiceToggle}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              isRecording
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            )}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        )}

        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200 resize-none overflow-hidden"
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
        </div>

        <button
          type="submit"
          disabled={!value.trim() || isSending}
          className={cn(
            "p-3 rounded-xl transition-all duration-200",
            value.trim() && !isSending
              ? "bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/25"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          )}
        >
          {isSending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </div>
  );
}
