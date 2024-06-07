import {Locale} from "@/i18n/i18n.config";
import Feature from "@/components/layout/feature";
import {formatTranslation as f} from "@/toolkit/i18n/utils";
import {getDictionary} from "@/i18n/dictionaries";
import Feature1 from "@/public/feature1.svg";
import Feature2 from "@/public/feature2.svg";
import Feature3 from "@/public/feature3.svg";

export const columnImageMap = {
  "dualSidebar": Feature1,
  "flexibleToolbar": Feature2,
  "privacyProtection": Feature3
} as Record<string, any>;

type FeatureColumnsProps = {
  lang: Locale;
}

export default async function FeatureColumns({lang}: FeatureColumnsProps) {
  const dict = await getDictionary(lang);
  const columns = dict.landingPage.columns as Record<string, any>;
  const columnKeys = Object.keys(columns);
  return (
    <>
      {columnKeys.map((item, i) => (
        <Feature
          image={columnImageMap[item]}
          header={f(columns[item].title)}
          description={f(columns[item].description)}
          leftToRight={i % 2 === 0}
          key={i}
        />
      ))}
    </>
  )
}