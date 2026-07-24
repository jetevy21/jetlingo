"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/types";
import Avatar3D from "./Avatar3D";
import { Check, ChevronRight } from "lucide-react";

interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatarId: string | null;
  onSelect: (avatarId: string) => void;
}

export default function AvatarSelector({
  avatars,
  selectedAvatarId,
  onSelect,
}: AvatarSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            onMouseEnter={() => setHoveredId(avatar.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              "relative p-4 rounded-2xl border transition-all duration-200 text-left",
              selectedAvatarId === avatar.id
                ? "bg-teal-500/10 border-teal-500/50"
                : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
            )}
          >
            <div className="flex flex-col items-center text-center">
              <Avatar3D
                name={avatar.name}
                imageUrl={avatar.imageUrl}
                state={hoveredId === avatar.id ? "speaking" : "idle"}
                size="md"
                className="mb-3"
              />
              <h4 className="text-sm font-medium text-white">{avatar.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{avatar.accent}</p>
              <p className="text-xs text-slate-500 mt-0.5 capitalize">
                {avatar.personality}
              </p>
            </div>

            {selectedAvatarId === avatar.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedAvatarId && (
        <div className="flex items-center justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl font-medium hover:bg-teal-400 transition-colors">
            Start Conversation
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
