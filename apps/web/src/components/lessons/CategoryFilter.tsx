"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
          selectedCategory === null
            ? "bg-teal-500 text-white"
            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            selectedCategory === category
              ? "bg-teal-500 text-white"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
