"use client";

import React, {useCallback, useEffect, useState} from "react";
import {
  Platform,
  getPlatform,
  convertOptionToPlatform,
  convertPlatformToOption,
  cn
} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/toolkit/components/ui/button";
import {CheckboxWithDescription} from "@/components/layout/checkbox-descreption";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/toolkit/components/ui/tabs";

type PlatformSelectLocale = {
  detect: string;
};

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
    if (searchParams.get('platform')) {
      return;
    }

    const ua = navigator.userAgent;
    const _p = getPlatform(ua);
    setPlatform(_p);
  }, []);

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

  // TODO: Not used yet, but will be used after the daylight release is merged with the rest.
  const daylightCheckbox = (
    <>
      <CheckboxWithDescription
        id={'daylight'}
        onChange={e => onCheckboxChange(e)}
        {...checkbox}
        initialChecked={searchParams.get('daylight') === 'true'}
        className={"mt-4"}
      />
      {alert}
    </>
  );

  return (
    <div className={cn(
      className,
      "flex flex-col gap-4 h-full w-full"
    )}>
      <div className='flex w-full h-full flex-col gap-4'>
        <Tabs
          value={convertPlatformToOption(platform)}
          defaultValue={convertPlatformToOption(initPlatform)}
          onValueChange={e => onTabChange(convertOptionToPlatform(e))}
          className={'flex flex-col gap-4 justify-between h-full'}
        >
          <div className='flex flex-row gap-4 justify-center sm:justify-start'>
            <Button variant={'outline'} onClick={() => setIsDetecting(true)}>
              {locale.detect}
            </Button>
            <TabsList
              className={''}
            >
              {platforms.map(({value, label}) => (
                <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          {/* TODO: Add the checkbox here after the daylight release is merged with the rest. */}
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