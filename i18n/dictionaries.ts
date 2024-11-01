import "server-only";
import type { Locale } from "./i18n.config";

const dictionaryFiles = [
  "en.json",
  "ja.json",
  "ko.json",
  "zh-CN",
  "zh-TW",
  "ru.json",
  "hu.json",
  "fr.json",
  "uk.json",
  "da.json",
];

const enDict = import("@/dictionaries/i18n/en/dictionary.json").then(
  (module) => module.default,
);
export type Dictionary = typeof enDict extends Promise<infer T> ? T : never;

const dictionaries = Object.fromEntries(
  dictionaryFiles
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const language = file.split(".")[0];
      return [
        language,
        async () => {
          const dictionary = await import(
            `@/dictionaries/i18n/${language}/dictionary.json`
          );
          return dictionary.default;
        },
      ];
    }),
) as Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? (await dictionaries.en());
