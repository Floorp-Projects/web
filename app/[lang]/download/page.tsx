"use client";

import {useEffect} from "react";
import {convertPlatformToOption, getPlatform} from "@/lib/utils";
import { useRouter } from "next/navigation";
import {Locale} from "@/i18n/i18n.config";

type DownloadPageProps = {
  params: { lang: Locale };
}

export default function DownloadPage({params: {lang}}: DownloadPageProps) {
  const router = useRouter();
  useEffect(() => {
      const ua = navigator.userAgent;
      const _p = getPlatform(ua);
      router.push( `/${lang}/download/${convertPlatformToOption(_p)}`);
  }, [])

  return <></>
}