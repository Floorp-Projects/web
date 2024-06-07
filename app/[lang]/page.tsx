import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import MainHeroCard from "@/components/layout/landing/hero-card";
import {BiBadgeCheck, BiBrush, BiCodeAlt, BiLockAlt, BiPaintRoll, BiShield} from 'react-icons/bi';
import {HeaderGridItem, ThreeColBentoGrid} from "@/components/ui/bento-grid";
import {ArticleResponse} from "@/components/layout/articles/article";
import ArticleList from "@/components/layout/articles/article-list";
import FeatureColumns from "@/components/layout/landing/feature-columns";
import ThemedImage from "@/toolkit/components/themed-image";
import DarkArticle from "@/public/thumbnails/article-dark.png";
import LightArticle from "@/public/thumbnails/article-light.png";
import {MainHero} from "@/components/layout/landing/main-hero";

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
    header: dict.common.title,
    description: dict.common.description,
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
  const features = dict.landingPage.features as Record<string, any>;
  const featuresKeys = Object.keys(dict.landingPage.features);

  const articleImage = (
    <ThemedImage
      darkImage={DarkArticle}
      lightImage={LightArticle}
      alt={'Article'}
      className={'rounded-xl'}
    />
  );

  return (
    <main className='w-full flex flex-col py-24'>
      <div className="flex min-h-screen w-full items-center flex-col">
        <div className="w-full flex flex-col gap-4 px-4 sm:px-0 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <MainHero translation={dict.landingPage.hero}/>
            <MainHeroCard {...heroProps}/>
          </div>
          <div className='col-span-2 flex flex-col gap-4 items-center mt-10'>
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              {dict.landingPage.feature}
            </h2>
            <ThreeColBentoGrid
              className="max-w-4xl mx-auto mb-24"
              height='12'
            >
              {featuresKeys.map((item, i) => (
                <HeaderGridItem
                  key={i}
                  title={features[item].title}
                  description={features[item].description}
                  icon={iconMap[item]}
                />
              ))}
            </ThreeColBentoGrid>
            <FeatureColumns lang={lang}/>
          </div>
          <div className={'w-full col-span-2 flex flex-col gap-4 items-center'}>
            <div className={'flex flex-col gap-4 max-w-4xl w-full'}>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {dict.landingPage.latestArticle}
              </h2>
              <ArticleList
                articles={articles}
                fadeOutAfter={3}
                seeMore={{
                  link: "https://blog.ablaze.one/category/ablaze/ablaze-project/floorp/",
                  text: dict.landingPage.article.readMore
                }}
                fixedImage={articleImage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}