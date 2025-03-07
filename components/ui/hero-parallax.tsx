"use client";

import React, {Suspense} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";

export type ParallaxProduct = {
  title: string;
  link?: string;
  thumbnail: string;
};

type HeroParallaxProps = {
  title: string;
  description: string;
  products: ParallaxProduct[];
}

export const HeroParallax = ({title, description, products}: HeroParallaxProps) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {stiffness: 300, damping: 30, bounce: 100};

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  const height = products.length < 10 ? "h-[220vh]" : "h-[300vh]";
  return (
    <div
      ref={ref}
      className={`${height} py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]`}
    >
      <Header description={description} title={title}/>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

type HeaderProps = {
  title: string;
  description: string;
};

export const Header = ({title, description}: HeaderProps) => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        {title}
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        {description}
      </p>
    </div>
  );
};

type ProductCardProps = {
  product: {
    title: string;
    link?: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
};

// @ts-ignore
export const ProductCard = ({product, translate}: ProductCardProps) => {

  const image = (
    <Image
      unoptimized
      src={product.thumbnail}
      height="600"
      width="600"
      className="object-cover object-left-top absolute inset-0 w-full h-full rounded-xl"
      alt={product.title}
    />
  );

  const getComponent = () => {
    if (!product.link) {
      return image;
    }

    return <Link
      href={product.link}
      className="block group-hover/product:shadow-2xl "
    >
      <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl"/>}>
        {image}
      </Suspense>
    </Link>
  }

  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-52 w-64 relative flex-shrink-0 lg:h-96 lg:w-[30rem]"
    >
      {getComponent()}
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
