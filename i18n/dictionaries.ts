import 'server-only'
import fs from 'fs'
import path from 'path'
import type { Locale } from './i18n.config';

const dictionariesPath = path.join(process.cwd(), 'i18n', 'dictionaries', 'i18n')
const dictionaryDirectories = fs.readdirSync(dictionariesPath)
const dictionaryFiles = dictionaryDirectories.flatMap((dir) => fs.readdirSync(path.join(dictionariesPath, dir)))

const enDict = import('@/dictionaries/i18n/ja/ja.json').then((module) => module.default);
export type Dictionary = typeof enDict extends Promise<infer T> ? T : never;

const dictionaries = Object.fromEntries(
  dictionaryFiles.filter((file) => file.endsWith('.json')).map((file) => {
    const language = file.split('.')[0]
    return [language, async () => {
      const dictionary = await import(`@/dictionaries/i18n/${language}/${language}.json`)
      return dictionary.default
    }]
  })
) as Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? await dictionaries.en();