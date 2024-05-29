import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Inter as FontSans} from "next/font/google"
import {cn} from "@/lib/utils";

export const runtime = 'edge';

type RootLayoutProps = {
  children: React.ReactNode,
}

const url = process.env.SELF_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(url),
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
