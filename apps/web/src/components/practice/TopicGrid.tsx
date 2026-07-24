"use client";

import { cn } from "@/lib/utils";
import { TopicCategory } from "@/types";
import { type LucideIcon } from "lucide-react";
import {
  Plane,
  Briefcase,
  Globe,
  Home,
  GraduationCap,
  Utensils,
  Heart,
  ShoppingBag,
} from "lucide-react";

interface TopicGridProps {
  topics: TopicCategory[];
  onSelectTopic: (topicId: string) => void;
  language?: string;
  langLabels?: Record<string, string>;
}

const iconMap: Record<string, LucideIcon> = {
  travel: Plane,
  business: Briefcase,
  culture: Globe,
  daily: Home,
  exam: GraduationCap,
  food: Utensils,
  health: Heart,
  shopping: ShoppingBag,
};

const defaultTopicDescriptions: Record<string, string> = {
  travel: "Airport, hotel, restaurant, asking directions",
  business: "Meetings, negotiations, presentations",
  culture: "Traditions, holidays, local customs",
  daily: "Everyday conversations, family, hobbies",
  exam: "DELE, DELF, Goethe, JLPT practice",
  food: "Ordering, recipes, food culture",
  health: "Doctor visits, fitness, wellness",
  shopping: "Stores, bargaining, online shopping",
};

export default function TopicGrid({ topics, onSelectTopic, language, langLabels }: TopicGridProps) {
  const defaultTopics: TopicCategory[] = [
    {
      id: "1",
      name: langLabels?.travel || "Travel",
      icon: "travel",
      description: defaultTopicDescriptions.travel,
      color: "from-teal-500 to-blue-500",
    },
    {
      id: "2",
      name: langLabels?.business || "Business",
      icon: "business",
      description: defaultTopicDescriptions.business,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "3",
      name: langLabels?.culture || "Culture",
      icon: "culture",
      description: defaultTopicDescriptions.culture,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "4",
      name: langLabels?.daily || "Daily Life",
      icon: "daily",
      description: defaultTopicDescriptions.daily,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "5",
      name: langLabels?.exam || "Exam Prep",
      icon: "exam",
      description: defaultTopicDescriptions.exam,
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "6",
      name: langLabels?.food || "Food & Dining",
      icon: "food",
      description: defaultTopicDescriptions.food,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "7",
      name: langLabels?.health || "Health",
      icon: "health",
      description: defaultTopicDescriptions.health,
      color: "from-red-500 to-rose-500",
    },
    {
      id: "8",
      name: langLabels?.shopping || "Shopping",
      icon: "shopping",
      description: defaultTopicDescriptions.shopping,
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const displayTopics = topics.length > 0 ? topics : defaultTopics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayTopics.map((topic) => {
        const Icon = iconMap[topic.icon] || Globe;
        return (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className={cn(
              "p-4 rounded-2xl border border-slate-700/50 bg-slate-800/50",
              "hover:border-teal-500/50 hover:bg-slate-800/80",
              "transition-all duration-200 text-left group"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                topic.color
              )}
            >
              <Icon size={24} className="text-white" />
            </div>
            <h3 className="text-base font-medium text-white mb-1 group-hover:text-teal-400 transition-colors">
              {topic.name}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2">
              {topic.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
