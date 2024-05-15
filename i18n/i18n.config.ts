export const defaultLocale = process.env.DEFAULT_LOCALE ?? ''
export const locales = process.env.LOCALES?.split(',') ?? []

if (!defaultLocale || !locales) {
  console.error('DEFAULT_LOCALE and LOCALES must be set')
}

export const reviewedTranslations: string[] = process.env.REVIEWED_TRANSLATIONS!.split(',');
export const inReviewTranslations: string[] = process.env.IN_REVIEW_TRANSLATIONS!.split(',');
export const notStartedTranslations: string[] = process.env.NOT_STARTED_TRANSLATIONS!.split(',');
export const isReviewed = (locale: string) => reviewedTranslations.includes(locale);
export const isInReview = (locale: string) => inReviewTranslations.includes(locale);
export const isNotStarted = (locale: string) => notStartedTranslations.includes(locale);

export const langDict = {
  en: "English",
  ja: "日本語",
  ru: "Русский",
  hu: "Magyar",
} as Record<string, string>;

if (!isReviewed(defaultLocale)) {
  console.error(`Default locale ${defaultLocale} is not reviewed`)
}

if (isNotStarted(defaultLocale)) {
  console.error(`Default locale ${defaultLocale} is not started`)
}

if (!locales.every(isReviewed)) {
  console.error(`Some locales are not reviewed: ${locales.filter(locale => !isReviewed(locale)).join(', ')}`)
}

export const i18n = {
  defaultLocale,
  locales: Object.keys(langDict),
} as const

export type Locale = (typeof i18n)['locales'][number]