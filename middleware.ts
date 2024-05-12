import type { NextRequest } from 'next/server'
import { NextFetchEvent, NextResponse } from 'next/server'
import { i18n } from './i18n/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
//@ts-ignore
import Negotiator from 'negotiator'

function combinePath(request: NextRequest, path: string): boolean {
  return request.nextUrl.pathname.startsWith(`/${getLocale(request)}/${path}`)
}

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  return matchLocale(languages, locales, i18n.defaultLocale)
}

type Environment = "production" | "development" | "other";

export function middleware(request: NextRequest, ev: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;
  return;
  if (pathname.startsWith('')) {
    if (
      [
        '/manifest.json',
        '/favicon.ico',
        '/toc.html',
        '/privacy.html'
      ].includes(pathname)
    ) {
      return;
    }
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = 'en';

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|image|_next|favicon.ico).*)']
}