import {Locale} from "@/i18n/i18n.config";
import FAlert from "@/components/alert";
import {getDictionary} from "@/i18n/dictionaries";
import PlatformSelect, {PlatformOption} from "@/components/layout/download/platform-select";
import React from "react";
import {AssetInfo, getRelease, Release} from "@/lib/gh-utils";
import {convertOptionToPlatform, Platform, platformOptions} from "@/lib/utils";

type DownloadPageProps = {
  params: { lang: Locale };
  searchParams: {
    daylight?: string;
    platform?: string;
  };
}

const getContent = (asset: AssetInfo) => {
  return (
    <div>
      <p>{asset.label}</p>
      <p>{asset.url}</p>
      <p>{asset.fileSize}</p>
    </div>
  )
}

const getPlatformOptions = (release: Release | null): PlatformOption[] => {
  if (!release) {
    return [];
  }
  const options: PlatformOption[] = [];
  for (let i = 0; i < Object.keys(platformOptions).length; i++) {
    const key = Object.keys(platformOptions)[i];
    const pKey = convertOptionToPlatform(key);
    if(pKey === Platform.Android || pKey === Platform.IOS) {
      continue;
    }
    const assets = release.downloads[convertOptionToPlatform(key)] || [];
    options.push({
      label: platformOptions[key],
      value: key,
      content: assets.map(getContent)
    })
  }

  return options;
}

export default async function DownloadPage({params: {lang}, searchParams}: DownloadPageProps) {
  const dict = await getDictionary(lang);
  const isDaylight = searchParams.daylight === 'true';
  const release = await getRelease();
  return (
    <>
      <PlatformSelect
        locale={{...dict.downloadPage.dropdownLocale, detect: dict.downloadPage.dropdownLocale.detect}}
        checkbox={dict.downloadPage.daylight}
        className={'mt-4'}
        alert={isDaylight ?  <FAlert lang={lang} description={dict.downloadPage.daylight.alert} severity={'warning'} />: null }
        platforms={getPlatformOptions(release)}
      />
    </>
  )
}