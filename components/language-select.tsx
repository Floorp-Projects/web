'use client'

import {usePathname, useSearchParams} from 'next/navigation'
import Link from 'next/link'
import {i18n} from '@/i18n/i18n.config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import {Button} from './ui/button';
import {isNotStarted, isReviewed} from "@/i18n/validators";
import {LanguagesIcon} from "lucide-react";

export interface LanguageSelectProps {
  languageSelect: string;
  inReview: string;
  waitingForContributions: string;
}

export default function LanguageSelect({languageSelect, inReview, waitingForContributions}: LanguageSelectProps) {

  const pathName = usePathname()
  const searchParams = useSearchParams();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    const url = segments.join('/');
    const params = new URLSearchParams(searchParams.toString())
    return `${url}?${params.toString()}`
  }

  const dict = {
    en: "English",
    ja: "日本語",
    ru: "Русский",
    hu: "Magyar",
  } as Record<string, string>;

  const extendLocaleIfNecessary = (locale: string) => {
    if (isNotStarted(locale)) {
      return `${dict[locale]} (${waitingForContributions})`
    }

    if (!isReviewed(locale)) {
      return `${dict[locale]} (${inReview})`
    }

    return dict[locale]
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" paddingH={'sm'}><LanguagesIcon className={'h-5 w-5'} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{languageSelect}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {i18n.locales.filter(locale => Object.keys(dict).includes(locale)).map(locale => {
          return (
            <DropdownMenuItem key={locale} disabled={!isReviewed(locale)} asChild>
              <Link href={redirectedPathName(locale)}>
                {extendLocaleIfNecessary(locale)}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}