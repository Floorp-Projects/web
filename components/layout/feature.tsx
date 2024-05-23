import Image from "next/image";
import {cn} from "@/lib/utils";
import React from "react";

type FeatureProps = {
  image: any;
  header: string | React.ReactNode;
  description: string | React.ReactNode;
  leftToRight?: boolean;
  link?: {
    href: string;
    target?: string;
  };
  rightClasses?: string;
  leftClasses?: string;
}


export default function Feature({
                                  image,
                                  header,
                                  leftToRight,
                                  rightClasses,
                                  leftClasses,
                                  description,
                                  link,
                                }: FeatureProps) {
  const left = leftToRight ? "order-1" : "order-2";
  const right = leftToRight ? "order-2" : "order-1";
  return (
    <div
      className={cn(
      "max-w-4xl relative gap-8 items-center justify-center",
      `sm:grid grid-cols-1 sm:grid-cols-2`,
      'mb-8'
    )}
    >
      <div className={
        cn('flex flex-col gap-2 order-${left} sm:col-span-1 col-span-2', left, leftClasses)
      }>
        <h3 className="font-bold text-xl text-neutral-600 dark:text-gray-50">{header}</h3>
        <p className="font-normal text-sm text-neutral-600 dark:text-gray-50">{description}</p>
      </div>
      <div className={
        cn('flex flex-col gap-2 w-full justify-center items-center order-${right} sm:col-span-1 col-span-2',
          right, rightClasses)}>
        <Image
          width={500}
          height={500}
          src={image}
          alt={typeof header === "string" ? header : "Feature Image"}
          className={`rounded-lg h-60 w-60 mt-4`}
        />
      </div>
    </div>
  )
}