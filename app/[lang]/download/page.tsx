import { getDictionary } from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import InfoAlert from "@/components/layout/info-alert";

type DownloadProps = {
  params: { lang: Locale }
};

export default async function Download({params: {lang}}: DownloadProps) {
  const dict = await getDictionary(lang);
  return (
    <main className='w-full py-24'>
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex flex-col max-w-4xl">
          <h1 className="text-4xl font-bold">{dict.downloadPage.download}</h1>
          <p>{dict.downloadPage.description}</p>
          <InfoAlert
            title={dict.components.alerts.info}
            description={dict.downloadPage.downloadAlert}
          />
        </div>
      </div>
    </main>
  );
}