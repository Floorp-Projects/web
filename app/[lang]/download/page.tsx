import { Locale } from "@/i18n/i18n.config";

type DownloadProps = {
  params: { lang: Locale }
};

export default function Download({params: {lang}}: DownloadProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Download Page</h1>
    </div>
  );
}