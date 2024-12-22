import "server-only";
import {Locale, locales, supportedFiles} from "./i18n.config";

const enDict = import("@/dictionaries/i18n/en/dictionary.json").then(
  (module) => module.default,
);
export type Dictionary = typeof enDict extends Promise<infer T> ? T : never;

const specialCases = (locale: string): Locale => {
  switch (locale) {
    case "zh":
      locale = "zh_CN";
      break;
    case "zh-Hans-CN":
      locale = "zh_CN";
      break;
    case "zh-Hant-TW":
      locale = "zh_TW";
      break;
  }

  for (const _locale of locales) {
    if (_locale.startsWith(locale) && _locale !== locale) {
      locale = _locale;
      break;
    }
  }

  return locale.replaceAll("-", "_") as Locale;
}

export const getDictionary = async (locale: Locale) => {
  const dictionaries = Object.fromEntries(
    supportedFiles
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

  return dictionaries[specialCases(locale)]?.() ?? (await dictionaries.en());
}
