import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
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


let locales = ['en', 'ja']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}