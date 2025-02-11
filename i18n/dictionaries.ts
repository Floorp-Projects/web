import "server-only";
import {Locale, locales, supportedFiles} from "./i18n.config";
import enDict from "@/dictionaries/i18n/en/dictionary.json" with {type: "json"};

export type Dictionary = typeof enDict;

const mergeDictionaries = (dict1: Record<string, any>, dict2: Record<string, any>): Dictionary => {
  const mergedDict = {...dict1};
  for (const key in dict2) {
    if (dict2.hasOwnProperty(key)) {
      const value = dict2[key];
      if (mergedDict[key]) {
        mergedDict[key] = {...mergedDict[key], ...value};
      } else {
        mergedDict[key] = value;
      }
    }
  }

  return mergedDict as Dictionary;
}

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

  const defaultDict = await dictionaries.en();
  const dictionary = await dictionaries[specialCases(locale)]?.() ?? defaultDict;

  if (locale === "en") {
    return defaultDict;
  }

  return mergeDictionaries(defaultDict, dictionary);
}
