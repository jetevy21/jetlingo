"use client";

import { useState, useEffect } from "react";
import { DictionaryWord } from "@/types";
import DictionaryList from "@/components/dictionary/DictionaryList";
import Button from "@/components/ui/Button";
import { useI18n } from "@/hooks/useI18n";
import { useAuthStore } from "@/stores/authStore";
import { getUser } from "@/lib/auth";
import { Search, Download } from "lucide-react";

const mockWordsByLang: Record<string, DictionaryWord[]> = {
  en: [
    { id: "1", word: "Restaurant", translation: "Restaurant", language: "English", context: "Let's go to the restaurant tonight.", reviewCount: 5 },
    { id: "2", word: "To order", translation: "Commander", language: "English", context: "I would like to order the chicken.", reviewCount: 3 },
    { id: "3", word: "The bill", translation: "L'addition", language: "English", context: "The bill, please.", reviewCount: 7 },
    { id: "4", word: "Delicious", translation: "Délicieux", language: "English", context: "This food is delicious.", reviewCount: 4 },
    { id: "5", word: "The menu", translation: "Le menu", language: "English", context: "Can I see the menu?", reviewCount: 2 },
  ],
  es: [
    { id: "1", word: "Restaurante", translation: "Restaurant", language: "Spanish", context: "Vamos al restaurante esta noche.", reviewCount: 5 },
    { id: "2", word: "Pedir", translation: "To order / To ask for", language: "Spanish", context: "Quisiera pedir la paella.", reviewCount: 3 },
    { id: "3", word: "La cuenta", translation: "The bill", language: "Spanish", context: "La cuenta, por favor.", reviewCount: 7 },
    { id: "4", word: "Delicioso", translation: "Delicious", language: "Spanish", context: "Esta comida está deliciosa.", reviewCount: 4 },
    { id: "5", word: "El menú", translation: "The menu", language: "Spanish", context: "¿Puedo ver el menú?", reviewCount: 2 },
  ],
  fr: [
    { id: "1", word: "Restaurant", translation: "Restaurant", language: "French", context: "Allons au restaurant ce soir.", reviewCount: 5 },
    { id: "2", word: "Commander", translation: "To order", language: "French", context: "Je voudrais commander le poulet.", reviewCount: 3 },
    { id: "3", word: "L'addition", translation: "The bill", language: "French", context: "L'addition, s'il vous plaît.", reviewCount: 7 },
    { id: "4", word: "Délicieux", translation: "Delicious", language: "French", context: "Cette nourriture est délicieuse.", reviewCount: 4 },
    { id: "5", word: "Le menu", translation: "The menu", language: "French", context: "Puis-je voir le menu ?", reviewCount: 2 },
  ],
};

export default function DictionaryPage() {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const targetLang = user?.targetLanguage || getUser()?.targetLanguage || "en";
  const [words, setWords] = useState<DictionaryWord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  useEffect(() => {
    setWords(mockWordsByLang[targetLang] || mockWordsByLang.en);
  }, [targetLang]);

  const filteredWords = words.filter(
    (w) =>
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteWord = (id: string) => {
    setWords(words.filter((w) => w.id !== id));
  };

  const handleAddWord = () => {
    if (newWord && newTranslation) {
      const word: DictionaryWord = {
        id: Date.now().toString(),
        word: newWord,
        translation: newTranslation,
        language: targetLang === "en" ? "English" : targetLang === "es" ? "Spanish" : "French",
        context: "",
        reviewCount: 0,
      };
      setWords([...words, word]);
      setNewWord("");
      setNewTranslation("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            {t.dictionary.title}
          </h1>
          <p className="text-slate-400 mt-1">
            {t.dictionary.subtitle}
          </p>
        </div>

        <Button variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          {t.dictionary.export}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder={t.dictionary.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-3">{t.dictionary.addNew}</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder={t.dictionary.word}
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
          />
          <input
            type="text"
            placeholder={t.dictionary.translation}
            value={newTranslation}
            onChange={(e) => setNewTranslation(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
          />
          <Button onClick={handleAddWord} disabled={!newWord || !newTranslation}>
            {t.dictionary.add}
          </Button>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        {filteredWords.length} {t.dictionary.wordsCount}
      </div>

      <DictionaryList words={filteredWords} onDeleteWord={handleDeleteWord} />
    </div>
  );
}
