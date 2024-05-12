import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {i18n} from './i18n/i18n.config'
import {match as matchLocale} from '@formatjs/intl-localematcher'
//@ts-ignore
import Negotiator from 'negotiator'
import {isReviewed} from "@/i18n/validators";

function combinePath(request: NextRequest, path: string): boolean {
  return request.nextUrl.pathname.startsWith(`/${getLocale(request)}/${path}`)
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  let languages = new Negotiator({headers: negotiatorHeaders}).languages(locales);
  return matchLocale(languages, locales, i18n.defaultLocale)
}

let locales = ['en', 'ja']
const excludedPaths = ['api', '_next/static', '_next/image', '/favicon.ico', '/manifest.json']

export function middleware(request: NextRequest) {
  let {pathname} = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (excludedPaths.includes(pathname)) {
    return;
  }

  let locale = getLocale(request)
  if (pathnameHasLocale) {
    const selectedLocale = pathname.split('/')[1]
    if (!isReviewed(selectedLocale || '')) {
      console.log(`Locale ${selectedLocale} is not reviewed, redirecting to en`)
      pathname = pathname.replace(`/${selectedLocale}`, '')
      locale = 'en'
    } else {
      return
    }
  }

  if (!isReviewed(locale || '')) {
    console.log(`Locale ${locale} is not reviewed, redirecting to en`)
    pathname = pathname.replace(`/${locale}`, '')
    locale = 'en'
  }

  console.log(`Redirecting to ${locale} and ${pathname}`)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next).*)'
  ],
}