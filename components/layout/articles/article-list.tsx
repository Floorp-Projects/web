import Article, {ArticleResponse} from "@/components/layout/articles/article";
import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/toolkit/components/ui/button";

type ArticleListProps = {
  articles: ArticleResponse[];
  fadeOutAfter?: number;
  seeMore?: {
    text: string;
    link: string;
  };
  fixedImage?: React.ReactNode;
}

export default function ArticleList({articles, fadeOutAfter, seeMore, fixedImage}: ArticleListProps) {
  fadeOutAfter = fadeOutAfter || articles.length;
  articles = articles.slice(0, fadeOutAfter);
  const seeMoreContent = seeMore ? (
    <Link
      className={cn(
        buttonVariants({variant: 'default'}),
        "absolute bottom-16 left-1/2 transform -translate-x-1/2"
      )}
      target={"_blank"}
      href={seeMore.link}>{seeMore.text}</Link>
  ) : null;
  return (
    <div className={"relative"}>
      {articles.map((article, index) => (
        <Article key={index} {...article} isFadeOut={index === fadeOutAfter - 1} fixedImage={fixedImage} />
      ))}
      {seeMoreContent}
    </div>
  )
}