export const defaultLocale = "en";
export const locales = [
  "en",
  "ja_JP",
  "zh_CN",
  "zh_TW",
  "ru_RU",
  "uk_UA",
  "fr_FR",
  "hu_HU",
  "da_DK",
] as const;

export const reviewedTranslations: string[] = [
  "en",
  "ja_JP",
  "zh_CN",
  "zh_TW",
  "ru_RU",
  "fr_FR",
  "da_DK",
];
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
  ja_JP: "日本語",
  zh_CN: "简体中文",
  zh_TW: "正體中文",
  // ko: "한국어", TODO: Had to be removed due to low quality translations
  ru_RU: "Русский",
  hu_HU: "Magyar",
  fr_FR: "Français",
  da_DK: "Dansk",
  uk_UA: "Українська",
} as Record<string, string>;

export const i18n = {
  defaultLocale,
  locales,
} as const;

export type Locale = (typeof i18n)["locales"][number];
