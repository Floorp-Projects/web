"use client";

import React, {useCallback, useEffect, useState} from "react";
import {
  Platform,
  getPlatform,
  convertOptionToPlatform,
  convertPlatformToOption,
  cn
} from "@/lib/utils";
import {ComboboxLocale} from "@/components/ui/combobox";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Locale} from "@/i18n/i18n.config";
import {Button} from "@/components/ui/button";
import {CheckboxWithDescription} from "@/components/layout/checkbox-descreption";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

type PlatformSelectLocale = {
  detect: string;
} & ComboboxLocale;

export type PlatformOption = {
  value: Platform | string;
  label: string;
  content: React.ReactNode;
}

type PlatformSelectProps = {
  locale: PlatformSelectLocale;
  checkbox: { label: string, description: string };
  platforms: PlatformOption[];
  className?: string;
  alert?: React.ReactNode;
}

export default function PlatformSelect({locale, platforms, className, alert, checkbox}: PlatformSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initPlatform = searchParams.get('platform') ? convertOptionToPlatform(searchParams.get('platform')!) : Platform.Windows;
  const [platform, setPlatform] = useState(initPlatform);
  const [isDetecting, setIsDetecting] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      return params.toString()
    },
    [searchParams]
  )

  const onCheckboxChange = (checked: boolean) => {
    if (!checked) {
      const query = removeQueryString('daylight')
      router.push(`${pathname}?${query}`)
      return
    }
    const query = createQueryString('daylight', checked ? 'true' : 'false')
    router.push(`${pathname}?${query}`)
  }

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
    if (!platform) {
      return;
    }
    const _p = convertPlatformToOption(platform);
    const query = createQueryString('platform', _p);
    router.push(`${pathname}?${query}`)
  }, [platform])

  const onTabChange = (value: Platform) => {
    setPlatform(value);
  }

  return (
    <div className={cn(
      className,
      "flex flex-col gap-4"
    )}>
      <div className='flex flex-row gap-4'>
        <Tabs
          value={convertPlatformToOption(platform)}
          defaultValue={convertPlatformToOption(initPlatform)}
          onValueChange={e => onTabChange(convertOptionToPlatform(e))}
        >
          <Button className={'mr-2'} variant={'outline'} onClick={() => setIsDetecting(true)}>
            {locale.detect}
          </Button>
          <TabsList>
            {platforms.map(({value, label}) => (
              <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
            ))}
          </TabsList>
          <CheckboxWithDescription
            id={'daylight'}
            onChange={e => onCheckboxChange(e)}
            {...checkbox}
            initialChecked={searchParams.get('daylight') === 'true'}
            className={"mt-4"}
          />
          {alert}
          {
            platforms.map(({value, content}) => (
              <TabsContent key={value} value={value}>
                {content}
              </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </div>
  )
}