import {Locale} from "@/i18n/i18n.config";
import Feature from "@/components/layout/feature";
import {formatTranslation as f} from "@/i18n/utils";
import {getDictionary} from "@/i18n/dictionaries";
import {columnImageMap} from "./feature-scroll";

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