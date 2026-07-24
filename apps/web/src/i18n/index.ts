import fr from "./fr";
import en from "./en";

export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
};

export type Translations = typeof fr;

const translations: Record<Locale, Translations> = { fr, en };

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale];
}
