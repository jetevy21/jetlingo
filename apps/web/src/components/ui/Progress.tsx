"use client";

import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "teal" | "amber" | "emerald" | "rose";
  showLabel?: boolean;
  className?: string;
}

export default function Progress({
  value,
  max = 100,
  size = "md",
  color = "teal",
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-sm font-medium text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={cn("w-full rounded-full bg-slate-700 overflow-hidden", {
          "h-1.5": size === "sm",
          "h-2.5": size === "md",
          "h-4": size === "lg",
        })}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            {
              "bg-teal-500": color === "teal",
              "bg-amber-500": color === "amber",
              "bg-emerald-500": color === "emerald",
              "bg-rose-500": color === "rose",
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
