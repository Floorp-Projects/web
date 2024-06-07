import Image from "next/image";
import Link from "next/link";
import {buttonVariants} from "@/toolkit/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/toolkit/components/ui/card";
import {cn} from "@/lib/utils";
import React from "react";

export type ArticleLocalizableProps = {
  postedBy: string;
  postedOn: string;
  readMore: string;
}

export type ArticleResponse = {
  title: string;
  date: string;
  author: string;
  link: string;
  description: string;
  image: string;
}

type ArticleProps = {
  locale?: ArticleLocalizableProps;
  readMore?: string;
  isFadeOut?: boolean;
  fixedImage?: React.ReactNode;
} & ArticleResponse;

export default function Article(props: ArticleProps) {
  const {title, date, author, link, description, image, locale, readMore, isFadeOut, fixedImage} = props;
  const readMoreContent = readMore ? (
    <Link href={readMore}
          className={cn(
            buttonVariants({variant: 'default'})
          )}>{locale ? locale.readMore : "Read more"}</Link>
  ) : <></>;

  const fadeOutDiv = isFadeOut ? (
    <div
      className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-0% to-background to-60%"/>
  ) : <></>;

  return (
    <div className={"relative my-4"}>
      {fadeOutDiv}
      <Link href={link} target={'_blank'}>
        <Card className={'border'}>
          <CardHeader className={'text-2xl font-bold text-foreground'}>{title}</CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse md:grid md:grid-cols-3">
              <div className="col-span-2">
                {description}
                {readMoreContent}
              </div>
              <div className={"flex justify-center items-center col-span-1 mb-4"}>
                {fixedImage ? fixedImage : <Image src={image} width={200} height={200} alt={title}/>}
              </div>
            </div>
          </CardContent>
          <CardFooter className={"flex justify-between"}>
            <p>{date}</p>
            <p>{author}</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}