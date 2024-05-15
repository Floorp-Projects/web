import {Locale} from "@/i18n/i18n.config";
import FAlert from "@/components/alert";
import {getDictionary} from "@/i18n/dictionaries";
import PlatformSelect, {PlatformOption} from "@/components/layout/download/platform-select";
import React from "react";
import {AssetInfo, getRelease} from "@/lib/gh-utils";
import {cn, convertOptionToPlatform, Platform, platformOptions} from "@/lib/utils";
import {AssetsTable} from "@/components/layout/download/assets-table";
import {formatTranslation as f} from "@/i18n/utils"
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type DownloadPageProps = {
  params: { lang: Locale };
  searchParams: {
    daylight?: string;
    platform?: string;
  };
}


export default async function DownloadPage({params: {lang}, searchParams}: DownloadPageProps) {
  const dict = await getDictionary(lang);
  const isDaylight = searchParams.daylight === 'true';
  const release = await getRelease();
  const date = release?.publishedAt.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || '';

  const table = (items: AssetInfo[]) => {
    if (!release) {
      return <></>
    }

    return (
      <div className={'mt-8'}>
        <div className={'flex h-5 items-center gap-4 ml-4 mb-2'}>
          <p className={'text-sm text-muted-foreground'}>
            {f(dict.downloadPage.releaseDate, {date})}
          </p>
          <Separator orientation="vertical" />
          <Link
            href={`https://github.com/Floorp-Projects/Floorp/releases/tag/${release.version}`}
            target={'_blank'}
            className={cn(
              buttonVariants({variant: 'link', paddingV: 'none', paddingH: 'none', size: 'auto'}),
            )}
          >
            {release.version}
          </Link>
        </div>
        <AssetsTable items={items} locale={dict.downloadPage.assetsTable}/>
      </div>
    )
  }

  const getPlatformOptions = (): PlatformOption[] => {
    if (!release) {
      return [];
    }
    const options: PlatformOption[] = [];
    for (let i = 0; i < Object.keys(platformOptions).length; i++) {
      const key = Object.keys(platformOptions)[i];
      const pKey = convertOptionToPlatform(key);
      if (pKey === Platform.Android || pKey === Platform.IOS) {
        continue;
      }
      const assets = release.downloads[convertOptionToPlatform(key)] || [];
      options.push({
        label: platformOptions[key],
        value: key,
        content: table(assets)
      })
    }

    return options;
  }

  return (
    <div className="flex flex-col items-start">
      <PlatformSelect
        locale={{...dict.downloadPage.dropdownLocale, detect: dict.downloadPage.dropdownLocale.detect}}
        checkbox={dict.downloadPage.daylight}
        className={'mt-4'}
        alert={isDaylight ?
          <FAlert lang={lang} description={dict.downloadPage.daylight.alert} severity={'warning'}/> : null}
        platforms={getPlatformOptions()}
      />
    </div>
  )
}