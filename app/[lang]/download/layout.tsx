import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import FAlert from "@/toolkit/components/custom/alert";
import {replaceComponent as r} from "@/toolkit/i18n/utils"
import React from "react";
import {getLink} from "@/i18n/common-components";

type DownloadProps = {
  params: { lang: Locale };
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function Download({params: {lang}, children}: DownloadProps) {
  const dict = await getDictionary(lang);
  const alertLocale = dict.components.alerts;
  return (
    <main className='w-full py-24'>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex flex-col max-w-4xl p-4 lg:w-[56rem]">
          <h1 className="text-4xl mb-8 font-bold">{dict.downloadPage.download}</h1>
          <FAlert
            severity="info"
            description={r(dict.downloadPage.downloadAlert, getLink("https://docs.ablaze.one/floorp_privacy_policy/"))}
            titles={alertLocale}
          />
          <section className="mt-8">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}