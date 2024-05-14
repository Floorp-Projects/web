import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import {MainHero} from "@/components/layout/main-hero";
import MainHeroCard from "@/components/layout/hero-card";
import {BiBadgeCheck, BiBrush, BiCodeAlt, BiLockAlt, BiPaintRoll, BiShield} from 'react-icons/bi';
import {HeaderGridItem, ThreeColBentoGrid} from "@/components/ui/bento-grid";
import {ArticleResponse} from "@/components/layout/articles/article";
import ArticleList from "@/components/layout/articles/article-list";
import {PreviewParallax} from "@/components/layout/landing/preview-parallax";
import FeatureColumns from "@/components/layout/landing/feature-columns";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

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

const getHeroProps = async (lang: Locale) => {
  const dict = await getDictionary(lang);
  return {
    header: dict.landingPage.heroCard.title,
    description: dict.landingPage.heroCard.description,
    sourceCode: dict.landingPage.heroCard.sourceCode,
    download: dict.landingPage.heroCard.download,
  }
}

const getFirstTwoArticles = async (top: number = 2) => {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=45');
  const articles = (await res.json()).items;
  let result: ArticleResponse[] = [];
  for (let i = 0; i < Math.min(articles.length, top); i++) {
    const article = articles[i] as ArticleResponse;
    result.push({
      title: article.title,
      date: article.date,
      description: article.description,
      author: article.author,
      image: article.image,
      link: article.link
    });
  }
  return result;
}

export default async function Home({params: {lang}}: HomeProps) {
  const dict = await getDictionary(lang);
  const heroProps = await getHeroProps(lang);
  const articles = await getFirstTwoArticles(4);
  return (
    <main className='w-full py-24'>
      <div className="flex min-h-screen w-full flex-col">
        <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 md:gap-4 md:px-4 overflow-hidden">
          <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"/>}>
            <MainHero translation={dict.landingPage.hero}/>
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"/>}>
            <MainHeroCard {...heroProps}/>
          </Suspense>
          <div className='col-span-2 flex flex-col gap-4 items-center mt-10'>
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {dict.landingPage.feature}
            </h2>
            <ThreeColBentoGrid
              className="max-w-4xl px-4 sm:px-0 mx-auto mb-24"
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
            <FeatureColumns lang={lang}/>
          </div>
          <div className={'w-full col-span-2 flex flex-col px-4 sm:px-0 gap-4 items-center'}>
            <div className={'flex flex-col gap-4 max-w-4xl w-full'}>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {dict.landingPage.latestArticle}
              </h2>
              <ArticleList articles={articles} fadeOutAfter={3} seeMore={{
                link: "https://blog.ablaze.one/category/ablaze/ablaze-project/floorp/",
                text: dict.landingPage.article.readMore
              }}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}