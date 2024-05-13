"use client";


import {useCallback, useEffect, useState} from "react";
import {
  Platform,
  getPlatform,
  platformOptions,
  convertOptionToPlatform,
  convertPlatformToOption,
  cn
} from "@/lib/utils";
import {Combobox, ComboboxItem, ComboboxLocale} from "@/components/ui/combobox";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Locale} from "@/i18n/i18n.config";
import {Button} from "@/components/ui/button";

const platforms: ComboboxItem<Platform>[] = [
  {
    value: Platform.Windows64,
    label: "Windows 64-bit",
    valueString: convertPlatformToOption(Platform.Windows64),
  },
  {
    value: Platform.Windows32,
    label: "Windows 32-bit",
    valueString: convertPlatformToOption(Platform.Windows32),
  },
  {
    value: Platform.MacOS,
    label: "Mac OS",
    valueString: convertPlatformToOption(Platform.MacOS)
  },
  {
    value: Platform.Linux,
    label: "Linux",
    valueString: convertPlatformToOption(Platform.Linux)
  }
]

type PlatformSelectLocale = {
  detect: string;
} & ComboboxLocale;

type PlatformSelectProps = {
  locale: PlatformSelectLocale;
  lang: Locale;
  className?: string;
}

export default function PlatformSelect({locale, lang, className}: PlatformSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const lastSegment = pathname.split('/').pop();
  const initPlatform = lastSegment ? convertOptionToPlatform(lastSegment) : Platform.Windows64;
  const [platform, setPlatform] = useState(initPlatform);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (isDetecting) {
      console.log('detecting');
      const ua = navigator.userAgent;
      const _p = getPlatform(ua);
      setPlatform(_p);
      setIsDetecting(false);
    }
  }, [isDetecting])

  useEffect(() => {
    if (lastSegment) {
      const _p = convertOptionToPlatform(lastSegment);
      setPlatform(_p);
      return;
    }
  }, [lastSegment])

  useEffect(() => {
    if (!platform) {
      return;
    }
    router.push(`/${lang}/download/${convertPlatformToOption(platform)}`);
  }, [platform])

  const onSelectionChange = (value: Platform) => {
    setPlatform(value);
  }

  return (
    <div className={cn(
      className,
      "flex flex-row gap-4"
    )}>
      <Combobox items={platforms} initialValue={platform} locale={locale} onChange={onSelectionChange}/>
      <Button variant={'outline'} onClick={() => setIsDetecting(true)}>
        {locale.detect}
      </Button>
    </div>
  )
}