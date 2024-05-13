import React from "react";
import {ScrollContent, StickyScroll} from "@/components/ui/sticky-scroll-reveal";
import {Locale} from "@/i18n/i18n.config";
import {getDictionary} from "@/i18n/dictionaries";
import Feature1 from "@/public/feature1.svg";
import Feature2 from "@/public/feature2.svg";
import Feature3 from "@/public/feature3.svg";
import Image from "next/image";

type FeatureScrollProps = {
  lang: Locale;
};

export const columnImageMap = {
  "dualSidebar": Feature1,
  "flexibleToolbar": Feature2,
  "privacyProtection": Feature3
} as Record<string, any>;

export async function FeatureScroll({lang}: FeatureScrollProps) {
  const dict = await getDictionary(lang);

  const getContents = (): ScrollContent[] => {
    let contents: ScrollContent[] = [];
    const columns = dict.landingPage.columns;
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const image = columnImageMap[column.key];
      const content: ScrollContent = {
        title: column.title,
        description: column.description,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image src={image} alt={column.title} className="h-full w-full object-cover" />
          </div>
        ),
      }
      contents.push(content);
    }
    return contents;
  }
  return (
    <div className="w-full h-screen">
      <StickyScroll content={getContents()} disableGradient />
    </div>
  );
}