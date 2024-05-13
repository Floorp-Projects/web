import React from "react";
import {HeroParallax, ParallaxProduct} from "@/components/ui/hero-parallax";
import {Locale} from "@/i18n/i18n.config";
import {getDictionary} from "@/i18n/dictionaries";
import Dummy1 from "@/public/hero/dummy1.png";
import Dummy2 from "@/public/hero/dummy2.png";
import Dummy3 from "@/public/hero/dummy3.png";
import Dummy4 from "@/public/hero/containers.png";
import Dummy5 from "@/public/hero/floorp1.png";
import Dummy6 from "@/public/hero/floorp2.png";
import Dummy7 from "@/public/hero/genbun.png";
import Dummy8 from "@/public/hero/ablaze-profile.png";

type LocaleProduct = {
  title: string;
  key: string;
}

type PreviewParallaxProps = {
  lang: Locale;
}

type ImageProduct = {
  image: any;
  link?: string;
}

const images = {
  moonbeam: {
    image: Dummy1,
  },
  cursor: {
    image: Dummy2,
  },
  rogue: {
    image: Dummy3,
  },
  editorially: {
    image: Dummy4,
  },
  editrix: {
    image: Dummy5,
  },
  genbun: {
    image: Dummy6,
  },
  ablaze: {
    image: Dummy7,
  },
  ablazeProfile: {
    image: Dummy8,
  }
} as Record<string, ImageProduct>;

const getProducts = (localeProducts: LocaleProduct[]): ParallaxProduct[] => {
  let products: ParallaxProduct[] = [];
  localeProducts.forEach((product) => {
    products.push({
      title: product.title,
      link: images[product.key].link,
      thumbnail: images[product.key].image,
    });
  });

  return products;
}

export async function PreviewParallax({lang}: PreviewParallaxProps) {
  const dict = await getDictionary(lang);
  const title = dict.landingPage.previewParallax.title
  const description = dict.landingPage.previewParallax.description
  const products = getProducts(dict.landingPage.previewParallax.images);
  return <HeroParallax products={products} title={title} description={description}/>;
}
