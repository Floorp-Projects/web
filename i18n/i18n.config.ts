export const defaultLocale = "en";
export const locales = [
  "en",
  "ja",
  "zh-CN",
  "zh-TW",
  "ru",
  "uk",
  "fr",
  "hu",
  "da",
] as const;

export const reviewedTranslations: string[] = ["en", "ja", "fr", "ru", "da"];
export const inReviewTranslations: string[] = ["uk", "hu"];
export const notStartedTranslations: string[] = [];
export const isReviewed = (locale: string) =>
  reviewedTranslations.includes(locale);
export const isInReview = (locale: string) =>
  inReviewTranslations.includes(locale);
export const isNotStarted = (locale: string) =>
  notStartedTranslations.includes(locale);

export const langDict = {
  en: "English",
  ja: "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "正體中文",
  // ko: "한국어", TODO: Had to be removed due to low quality translations
  ru: "Русский",
  hu: "Magyar",
  fr: "Français",
  da: "Dansk",
  uk: "Українська",
} as Record<string, string>;

export const i18n = {
  defaultLocale,
  locales: locales,
} as const;

export type Locale = (typeof i18n)["locales"][number];
