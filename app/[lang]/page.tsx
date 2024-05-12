import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import {MainHero} from "@/components/layout/main-hero";
import HeaderAndSideNav from "@/components/layout/header-and-side-nav";
import MainHeroCard from "@/components/layout/hero-card";

type HomeProps = {
  params: { lang: Locale }
};

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
        <HeaderAndSideNav/>
        <div className="w-full grid grid-cols-2 gap-4">
          <MainHero translation={dict.landingPage.hero}/>
          <MainHeroCard {...heroProps}/>
        </div>
      </div>
    </>
  );
}