

export const reviewedTranslations: string[] = process.env.REVIEWED_TRANSLATIONS!.split(',');
export const inReviewTranslations: string[] = process.env.IN_REVIEW_TRANSLATIONS!.split(',');
export const notStartedTranslations: string[] = process.env.NOT_STARTED_TRANSLATIONS!.split(',');

export const defaultLocale: string = process.env.DEFAULT_LOCALE!;

export const isReviewed = (locale: string) => reviewedTranslations.includes(locale);
export const isInReview = (locale: string) => inReviewTranslations.includes(locale);
export const isNotStarted = (locale: string) => notStartedTranslations.includes(locale);
