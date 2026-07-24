"use client";

import { cn } from "@/lib/utils";

type AvatarState = "idle" | "speaking" | "listening" | "thinking";

interface Avatar3DProps {
  name: string;
  imageUrl?: string;
  state?: AvatarState;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar3D({
  name,
  imageUrl,
  state = "idle",
  size = "lg",
  className,
}: Avatar3DProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  const stateAnimation = {
    idle: "animate-breathing",
    speaking: "animate-pulse-slow",
    listening: "",
    thinking: "",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center",
        sizeClasses[size],
        stateAnimation[state],
        className
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
          <span
            className={cn(
              "font-bold text-white",
              size === "sm" && "text-sm",
              size === "md" && "text-lg",
              size === "lg" && "text-3xl",
              size === "xl" && "text-5xl"
            )}
          >
            {getInitials(name)}
          </span>
        </div>
      )}

      {state === "listening" && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-teal-400 rounded-full animate-waveform"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: "4px",
              }}
            />
          ))}
        </div>
      )}

      {state === "thinking" && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-thinking"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 rounded-full border-2",
          state === "speaking"
            ? "border-teal-400 animate-ping"
            : state === "listening"
            ? "border-teal-400/50"
            : "border-transparent"
        )}
      />
    </div>
  );
}
