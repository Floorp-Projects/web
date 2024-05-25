import type {Metadata} from "next";
import "./globals.css";
import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import React from "react";
import {Inter as FontSans} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider";
import HeaderAndSideNav from "@/components/layout/header-and-side-nav";
import Footer from "@/components/layout/footer";
import {cn} from "@/lib/utils";
import DevAlert from "@/components/layout/dev-alert";

export const runtime = 'edge';

type RootLayoutProps = {
  children: React.ReactNode,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://devtest.kou-gen.net')
}

const fontSans = FontSans({
  subsets: ["latin"],
})

export default async function RootLayout({children}: RootLayoutProps) {
  const bodyClasses = fontSans.className
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={cn(
      bodyClasses
    )}>
    <ThemeProvider
      attribute={"class"}
      defaultTheme={'system'}
      enableSystem>
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
