import type { Metadata } from "next";
import "./globals.css";
import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import React from "react";
import { Inter as FontSans } from "next/font/google"
import {cn} from "@/lib/utils";

type MetadataProps = {
  params: { lang: Locale }
};

type RootLayoutProps = {
  children: React.ReactNode
}

export async function generateMetadata({ params: { lang } }: MetadataProps): Promise<Metadata> {
  const dict = await getDictionary(lang)
  return {
    title: dict.metadata.title,
    description: dict.common.description,
  }
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({children}: RootLayoutProps) {
  const bodyClasses = cn(fontSans.variable)

  return (
    <html lang="en">
      <body className={bodyClasses}>{children}</body>
    </html>
  );
}
