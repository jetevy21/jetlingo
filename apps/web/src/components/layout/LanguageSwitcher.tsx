"use client";

import { useI18n } from "@/hooks/useI18n";
import { localeLabels, localeFlags, type Locale } from "@/i18n";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-slate-300"
        aria-label="Changer de langue"
      >
        <Globe size={16} />
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden z-50">
          {(["fr", "en"] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === l
                  ? "bg-teal-500/15 text-teal-400"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{localeFlags[l]}</span>
              <span>{localeLabels[l]}</span>
              {locale === l && (
                <span className="ml-auto text-teal-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
