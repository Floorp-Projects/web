import type {Metadata} from "next";
import "@/toolkit/styles/floorp/globals.css";
import React from "react";
import {Inter as FontSans} from "next/font/google"
import {cn} from "@/lib/utils";
import {headers} from "next/headers";
import {getDictionary} from "@/i18n/dictionaries";

export const runtime = 'edge';

type RootLayoutProps = {
  children: React.ReactNode,
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("en");
  return {
    metadataBase: new URL(`https://${headers().get("host")}`),
    title: dict.common.title,
    description: dict.common.description,
  };
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
    {children}
    </body>
    </html>
  );
}
