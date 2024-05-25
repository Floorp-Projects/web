export const defaultLocale = "en"
export const locales = ["en", "ja", "ru"]

export const reviewedTranslations: string[] = ["en", "ja", "ru"]
export const inReviewTranslations: string[] = []
export const notStartedTranslations: string[] = []
export const isReviewed = (locale: string) => reviewedTranslations.includes(locale);
export const isInReview = (locale: string) => inReviewTranslations.includes(locale);
export const isNotStarted = (locale: string) => notStartedTranslations.includes(locale);

export const langDict = {
  en: "English",
  ja: "日本語",
  ru: "Русский",
  hu: "Magyar",
} as Record<string, string>;

export const i18n = {
  defaultLocale,
  locales: locales,
} as const

export type Locale = (typeof i18n)['locales'][number]