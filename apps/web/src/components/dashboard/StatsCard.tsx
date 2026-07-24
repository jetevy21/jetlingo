"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: "teal" | "amber" | "emerald" | "rose" | "purple";
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color = "teal",
}: StatsCardProps) {
  return (
    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs mt-1",
                change.startsWith("+") ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            {
              "bg-teal-500/20 text-teal-400": color === "teal",
              "bg-amber-500/20 text-amber-400": color === "amber",
              "bg-emerald-500/20 text-emerald-400": color === "emerald",
              "bg-rose-500/20 text-rose-400": color === "rose",
              "bg-purple-500/20 text-purple-400": color === "purple",
            }
          )}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
