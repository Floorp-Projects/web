import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  defaultLocale,
  i18n,
  isNotStarted,
  isReviewed,
  locales,
} from "./i18n/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
//@ts-ignore
import Negotiator from "negotiator";

function combinePath(request: NextRequest, path: string): boolean {
  return request.nextUrl.pathname.startsWith(`/${getLocale(request)}/${path}`);
}

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales.map((locale) =>
    locale?.replace("_", "-"),
  );
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );
  console.log("Languages: ", languages);
  return matchLocale(languages, locales, i18n.defaultLocale);
}

const excludedPaths = [
  "api",
  "_next/static",
  "_next/image",
  "/favicon.ico",
  "/manifest.json",
  "/_next/webpack-hmr",
  "/opengraph-image",
  "/twitter-image",
];

export function middleware(request: NextRequest) {
  let { pathname } = request.nextUrl;
  try {
    const pathnameHasLocale = locales
      .map((locale) => locale.replace("_", "-"))
      .some(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
      );

    // Check if any of the excluded paths are in the request
    if (excludedPaths.some((path) => pathname.includes(path))) {
      return;
    }

    let locale = getLocale(request);
    if (pathnameHasLocale) {
      const selectedLocale = pathname.split("/")[1];
      if (isNotStarted(selectedLocale || "")) {
        console.log(
          `Locale ${selectedLocale} is not reviewed, redirecting to en`,
        );
        pathname = pathname.replace(`/${selectedLocale}`, "");
        locale = defaultLocale;
      } else {
        return;
      }
    }

    if (isNotStarted(locale || "")) {
      console.log(`Locale ${locale} is not reviewed, redirecting to en`);
      pathname = pathname.replace(`/${locale}`, "");
      locale = defaultLocale;
    }
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  } catch (e) {
    console.error(e);
  }
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
