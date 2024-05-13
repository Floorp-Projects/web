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
  return (
    <>
      {dict.landingPage.columns.map((item, i) => (
        <Feature
          image={columnImageMap[item.key]}
          header={item.title}
          description={f(item.description)}
          leftToRight={i % 2 === 0}
          key={i}
        />
      ))}
    </>
  )
}