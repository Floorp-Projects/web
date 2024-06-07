import {CardBody, CardContainer, CardItem} from "@/toolkit/components/ui/3d-card";
import Image from "next/image";
import hero from "@/public/hero.png";
import Link from "next/link";
import {buttonVariants} from "@/toolkit/components/ui/button";

export type MainHeroCardProps = {
  header: string;
  description: string;
  sourceCode: string;
  download: string;
}

export default function MainHeroCard({header, description, sourceCode, download}: MainHeroCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {header}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={hero}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://github.com/Floorp-Projects/Floorp"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {sourceCode}
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href="/download"
            className={buttonVariants({variant: "default"})}
          >
            {download}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}