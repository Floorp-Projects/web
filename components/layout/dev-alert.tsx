import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {buttonVariants} from "@/components/ui/button";


export default function DevAlert() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={'https://floorp.app'}><Badge variant={'destructiveOutline'}>dev</Badge></Link>
      </HoverCardTrigger>
      <HoverCardContent size={"xxl"}>
        <div className="p-4 bg-background rounded-lg text-sm">
          <p className="text-black dark:text-gray-50">Development Mode</p>
          <p className="text-neutral-700">This is a development build</p>
          <p className={'p-0 m-0'}>Go to <Link className={buttonVariants({variant: "link", paddingH: "none", paddingV: "none"})} href={"https://floorp.app"}>https://floorp.app</Link> to check the production</p>
          <br/>
          <p>Be aware, that this website can <span className={'font-bold'}>go down at any time</span>, or <span className={'font-bold'}>be reset</span></p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}