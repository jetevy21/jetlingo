"use client";

import { useState, useEffect } from "react";
import TopicGrid from "@/components/practice/TopicGrid";
import FreeTalkMode from "@/components/practice/FreeTalkMode";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { useAuthStore } from "@/stores/authStore";

const languageTopicLabels: Record<string, Record<string, string>> = {
  es: {
    travel: "Viajes",
    business: "Negocios",
    culture: "Cultura",
    daily: "Vida diaria",
    exam: "Preparación DELE",
    food: "Comida y bebida",
    health: "Salud",
    shopping: "Compras",
  },
  en: {
    travel: "Travel",
    business: "Business",
    culture: "Culture",
    daily: "Daily Life",
    exam: "Exam Prep (IELTS)",
    food: "Food & Dining",
    health: "Health",
    shopping: "Shopping",
  },
  fr: {
    travel: "Voyages",
    business: "Affaires",
    culture: "Culture",
    daily: "Vie quotidienne",
    exam: "Préparation DELF",
    food: "Nourriture",
    health: "Santé",
    shopping: "Courses",
  },
  de: {
    travel: "Reisen",
    business: "Geschäft",
    culture: "Kultur",
    daily: "Alltag",
    exam: "Goethe Vorbereitung",
    food: "Essen",
    health: "Gesundheit",
    shopping: "Einkaufen",
  },
};

export default function PracticePage() {
  const router = useRouter();
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useAuthStore();
  const [targetLang, setTargetLang] = useState(user?.targetLanguage || "en");

  useEffect(() => {
    setTargetLang(user?.targetLanguage || "en");
  }, [user]);

  const langLabels = languageTopicLabels[targetLang] || languageTopicLabels.en;

  const handleStartTopic = (topicId: string) => {
    router.push(`/conversation/new?topic=${topicId}`);
  };

  const handleStartFreeTalk = () => {
    router.push("/conversation/new?mode=freetalk");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">
          {t.practice.title}
        </h1>
        <p className="text-slate-400 mt-1">
          {t.practice.subtitle}
        </p>
      </div>

      <FreeTalkMode onStart={handleStartFreeTalk} />

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          {t.practice.topics}
        </h2>
        <TopicGrid
          topics={[]}
          onSelectTopic={handleStartTopic}
          language={targetLang}
          langLabels={langLabels}
        />
      </div>

      <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-4">
          {t.practice.recommended}
        </h3>
        <p className="text-sm text-slate-500">
          {t.practice.recommendedDesc}
          <span className="text-teal-400">{langLabels.food || "Food vocabulary"}</span> et{" "}
          <span className="text-teal-400">{langLabels.daily || "Daily life"}</span>.
        </p>
      </div>
    </div>
  );
}
