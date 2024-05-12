'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n/i18n.config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';

export interface Resources {
  dropdownTitle: string;
}

export default function LanguageSelect({ res }: { res: Resources }) {

  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const dict = {
    en: "English",
    ja: "日本語",
  }

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{res.dropdownTitle}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{res.dropdownTitle}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {i18n.locales.map((locale) => {
          return (
            <Link key={locale} href={redirectedPathName(locale)}>
              <DropdownMenuItem >{dict[locale]}</DropdownMenuItem>
            </Link>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}