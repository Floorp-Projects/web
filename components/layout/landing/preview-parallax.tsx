import React from "react";
import {HeroParallax, ParallaxProduct} from "@/components/ui/hero-parallax";
import {Locale} from "@/i18n/i18n.config";
import {getDictionary} from "@/i18n/dictionaries";
import Dummy1 from "@/public/hero/floorp1.png";

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
  floorp: {
    image: Dummy1,
  },
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
  /*const title = dict.landingPage.previewParallax.title
  const description = dict.landingPage.previewParallax.description
  const products = getProducts(dict.landingPage.previewParallax.images);
  return <HeroParallax products={products} title={title} description={description}/>;
   */

  return <p>Not implemented</p>;
}
