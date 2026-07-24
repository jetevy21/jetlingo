"use client";

import { cn } from "@/lib/utils";
import { DictionaryWord } from "@/types";
import WordCard from "./WordCard";
import { BookOpen } from "lucide-react";

interface DictionaryListProps {
  words: DictionaryWord[];
  onDeleteWord: (id: string) => void;
}

export default function DictionaryList({ words, onDeleteWord }: DictionaryListProps) {
  if (words.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen size={48} className="mx-auto text-slate-600 mb-4" />
        <h3 className="text-lg font-medium text-slate-400 mb-2">
          No words saved yet
        </h3>
        <p className="text-sm text-slate-500">
          Words you save during conversations will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word) => (
        <WordCard key={word.id} word={word} onDelete={onDeleteWord} />
      ))}
    </div>
  );
}
