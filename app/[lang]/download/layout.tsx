import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import FAlert from "@/components/alert";
import PlatformSelect from "@/components/layout/download/platform-select";
import {replaceComponent as r} from "@/i18n/utils"
import React from "react";
import {getLink} from "@/i18n/common-components";

type DownloadProps = {
  params: { lang: Locale };
  children: React.ReactNode;
};

export default async function Download({params: {lang}, children}: DownloadProps) {
  const dict = await getDictionary(lang);
  return (
    <main className='w-full py-24'>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex flex-col max-w-4xl p-4 lg:w-[56rem]">
          <h1 className="text-4xl font-bold">{dict.downloadPage.download}</h1>
          <p>{dict.downloadPage.description}</p>
          <FAlert
            severity="info"
            description={r(dict.downloadPage.downloadAlert, getLink("https://docs.ablaze.one/floorp_privacy_policy/"))}
            lang={lang}
          />
          <section className="mt-8">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}