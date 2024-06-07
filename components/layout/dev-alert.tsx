import Link from "next/link";
import {getComponent, isDevelopment} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/toolkit/components/hover-card";
import {Badge} from "@/toolkit/components/badge";
import { buttonVariants } from "@/toolkit/components/ui/button";


export default function DevAlert() {
  return getComponent(
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link className={'absolute left-1/2 transform -translate-x-1/2 top-4'}
              href={'https://floorp.app'}>
          <Badge variant={'destructiveOutline'}>dev</Badge>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent size={"xxl"}>
        <div className="p-4 bg-background rounded-lg text-sm">
          <p className="text-black dark:text-gray-50">Development Mode</p>
          <p className="text-neutral-700 dark:text-neutral-500">This is a development build</p>
          <p className={'mt-2'}>Go to <Link
            className={buttonVariants({variant: "link", paddingH: "none", paddingV: "none", size: "auto"})}
            href={"https://floorp.app"}>https://floorp.app</Link> to check the production</p>
          <p className={'mt-2'}>Be aware, that this website can <span className={'font-bold'}>go down at any time</span>, or <span
            className={'font-bold'}>be reset</span></p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}