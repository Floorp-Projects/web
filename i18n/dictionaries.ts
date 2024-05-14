import 'server-only'
import fs from 'fs'
import path from 'path'
import type { Locale } from './i18n.config';

const dictionariesPath = path.join(process.cwd(), 'i18n', 'dictionaries');
const dictionaryFiles = fs.readdirSync(dictionariesPath)

const enDict = import('@/dictionaries/en.json').then((module) => module.default);
export type Dictionary = typeof enDict extends Promise<infer T> ? T : never;

const dictionaries = Object.fromEntries(
  dictionaryFiles.map((file) => {
    const language = file.split('.')[0]
    return [language, async () => {
      const dictionary = await import(`./dictionaries/${file}`)
      return dictionary.default
    }]
  })
) as Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? await dictionaries.en();