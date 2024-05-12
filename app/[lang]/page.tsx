import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import {MainHero} from "@/components/layout/main-hero";
import MainHeroCard from "@/components/layout/hero-card";
import {BiBadgeCheck, BiBrush, BiCodeAlt, BiLockAlt, BiPaintRoll, BiShield} from 'react-icons/bi';
import {HeaderGridItem, ThreeColBentoGrid} from "@/components/ui/bento-grid";
import Feature1 from "@/public/feature1.svg";
import Feature2 from "@/public/feature2.svg";
import Feature3 from "@/public/feature3.svg";
import Feature from "@/components/layout/feature";
import {formatTranslation as f} from "@/i18n/utils";

type HomeProps = {
  params: { lang: Locale }
};

const iconMap = {
  "privacy": <BiLockAlt/>,
  "flexible": <BiBrush/>,
  "switchable": <BiBadgeCheck/>,
  "sidebar": <BiPaintRoll/>,
  "noTracking": <BiShield/>,
  "openSource": <BiCodeAlt/>
} as Record<string, any>;

const columnImageMap = {
  "dualSidebar": Feature1,
  "flexibleToolbar": Feature2,
  "privacyProtection": Feature3
} as Record<string, any>;

const getHeroProps = async (lang: Locale) => {
  const dict = await getDictionary(lang);
  return {
    header: dict.landingPage.heroCard.title,
    description: dict.landingPage.heroCard.description,
    sourceCode: dict.landingPage.heroCard.sourceCode,
    download: dict.landingPage.heroCard.download,
  }
}

export default async function Home({params: {lang}}: HomeProps) {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=45');
  const article = (await res.json()).items[0];
  const dict = await getDictionary(lang);
  const heroProps = await getHeroProps(lang);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <div className="w-full flex flex-col gap-4 mt-24 lg:grid lg:grid-cols-2 md:gap-4 md:px-4">
          <MainHero translation={dict.landingPage.hero}/>
          <MainHeroCard {...heroProps}/>
          <div className='col-span-2 flex flex-col gap-4 items-center mt-10'>
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {dict.landingPage.feature}
            </h2>
            <ThreeColBentoGrid
              className="max-w-4xl mx-auto mb-24"
              height='12'
            >
              {dict.landingPage.features.map((item, i) => (
                <HeaderGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  icon={iconMap[item.key]}
                />
              ))}
            </ThreeColBentoGrid>
            {dict.landingPage.columns.map((item, i) => (
              <Feature
                image={columnImageMap[item.key]}
                header={item.title}
                description={f(item.description)}
                leftToRight={i % 2 === 0}
                key={i}
              />
            ))
            }
          </div>
          <div className={'w-full col-span-2 flex flex-col gap-4 items-center'}>
            <div className={'flex flex-col gap-4 max-w-4xl w-full'}>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {dict.landingPage.latestArticle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}