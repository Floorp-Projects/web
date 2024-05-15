"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import {replaceComponent as rC} from "@/i18n/utils";

type MainHeroProps = {
  translation: string;
};

export function MainHero({translation}: MainHeroProps) {
  const formatted = rC(translation, {key: "1", type: Highlight, rest: {className: "text-black dark:text-white"}});
  return (
    <HeroHighlight className={'z-20'}>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="px-4 text-3xl md:text-5xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-left mx-auto "
      >
        {formatted}
      </motion.h1>
    </HeroHighlight>
  );
}