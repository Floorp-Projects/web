import type {Metadata} from "next";
import "./globals.css";
import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import React from "react";
import {Inter as FontSans} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider";

type MetadataProps = {
  params: { lang: Locale }
};

type RootLayoutProps = {
  children: React.ReactNode
}

export async function generateMetadata({params: {lang}}: MetadataProps): Promise<Metadata> {
  const dict = await getDictionary(lang)
  return {
    title: dict.metadata.title,
    description: dict.common.description,
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
})

export default function RootLayout({children}: RootLayoutProps) {
  const bodyClasses = fontSans.className

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={bodyClasses}>
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
