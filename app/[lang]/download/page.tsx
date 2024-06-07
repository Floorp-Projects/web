import {Locale} from "@/i18n/i18n.config";
import FAlert from "@/toolkit/components/custom/alert";
import {getDictionary} from "@/i18n/dictionaries";
import PlatformSelect, {PlatformOption} from "@/components/layout/download/platform-select";
import React from "react";
import {AssetInfo, getRelease, getTags} from "@/lib/gh-utils";
import {cn, convertOptionToPlatform, Platform, platformOptions} from "@/lib/utils";
import {AssetsTable} from "@/components/layout/download/assets-table";
import {formatTranslation as f} from "@/toolkit/i18n/utils"
import Link from "next/link";
import {buttonVariants} from "@/toolkit/components/ui/button";
import {Separator} from "@/toolkit/components/ui/separator";
import {ScrollArea} from "@/toolkit/components/ui/scroll-area";

type DownloadPageProps = {
  params: { lang: Locale };
  searchParams: {
    daylight?: string;
    platform?: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function DownloadPage({params: {lang}, searchParams}: DownloadPageProps) {
  const dict = await getDictionary(lang);
  const alertLocale = dict.components.alerts;
  const isDaylight = searchParams.daylight === 'true';
  const release = await getRelease();
  const tags = await getTags();
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
      <div className={'flex flex-col sm:flex-row mt-8 gap-4 justify-between w-full'}>
        <div>
          <div className={'flex items-center gap-4 ml-4 mb-2'}>
            <div className={'flex flex-col sm:flex-row gap-2 justify-center sm:justify-between w-full'}>
              <p className={'text-sm text-muted-foreground text-center sm:text-left'}>
                {f(dict.downloadPage.releaseDate, {date})}
              </p>
              <Separator orientation="vertical" className={'h-5 hidden sm:block'}/>
              <Link
                href={`https://github.com/Floorp-Projects/Floorp/releases/tag/${release.version}`}
                target={'_blank'}
                className={cn(
                  buttonVariants({variant: 'link', paddingV: 'none', paddingH: 'none', size: 'auto'}),
                )}
              >
                {release.version}
              </Link>
              <Separator orientation="vertical" className={'h-5 hidden sm:block'}/>
              <Link
                href={release.hashes}
                className={cn(
                  buttonVariants({variant: 'link', paddingV: 'none', paddingH: 'none', size: 'auto'}),
                )}
              >
                {dict.downloadPage.downloadHashes}
              </Link>
            </div>
          </div>
          <AssetsTable items={items} locale={dict.downloadPage.assetsTable}/>
        </div>
        <ScrollArea className="bg-card h-80 w-36 rounded-md relative pt-10 border self-center">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium absolute top-4 leading-none">{dict.downloadPage.versions}</h4>
            <Separator className="absolute top-10 left-0"/>
            {tags.map((tag, i) => (
              <>
                <div key={tag} className="text-sm">
                  <Link
                    href={`https://github.com/Floorp-Projects/Floorp/releases/tag/${tag}`}
                    target={'_blank'}
                    className={cn(
                      buttonVariants({variant: 'link', paddingV: 'none', paddingH: 'none', size: 'auto'}),
                    )}
                  >
                    {tag}{i === 0 ? " - " + dict.downloadPage.latest : ''}
                  </Link>
                </div>
                <Separator className="my-2"/>
              </>
            ))}
          </div>
        </ScrollArea>
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

  const platformSelect = (
    <PlatformSelect
      locale={{ detect: dict.downloadPage.detect}}
      checkbox={dict.downloadPage.daylight}
      alert={isDaylight ?
        <FAlert titles={alertLocale} description={dict.downloadPage.daylight.alert} severity={'warning'}/> : null}
      platforms={getPlatformOptions()}
    />
  )

  const noRelease = (
    <>
      <p>{dict.downloadPage.noReleaseFound}</p>
    </>
  );

  return (
    <div className="flex flex-col w-full sm:flex-row items-center justify-between sm:items-start gap-4">
      {!release ? noRelease : platformSelect}
    </div>
  )
}