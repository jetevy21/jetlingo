"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DictionaryWord } from "@/types";
import { Volume2, Trash2 } from "lucide-react";

interface WordCardProps {
  word: DictionaryWord;
  onDelete: (id: string) => void;
}

export default function WordCard({ word, onDelete }: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "w-full transition-transform duration-500 transform-style-3d cursor-pointer",
          isFlipped && "rotate-y-180"
        )}
      >
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backface-hidden">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">{word.word}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(word.id);
              }}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-rose-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-sm text-slate-400">{word.translation}</p>
          {word.context && (
            <p className="text-xs text-slate-500 mt-2 italic">
              &quot;{word.context}&quot;
            </p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-500">
              Reviewed {word.reviewCount} times
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-teal-400 transition-colors"
            >
              <Volume2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
