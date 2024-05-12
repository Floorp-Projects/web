import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {getDictionary} from "@/i18n/dictionaries";
import {Locale} from "@/i18n/i18n.config";
import {replaceComponent as rC} from "@/i18n/utils";
import Link from "next/link";
import Image from "next/image";
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import {Button, buttonVariants} from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type HomeProps = {
  params: { lang: Locale }
};

export default async function Home({params: {lang}}: HomeProps) {
  const res = await fetch('https://wpapi.ablaze.one/?home=https://blog.ablaze.one/&categories=45');
  const article = (await res.json()).items[0];
  const dict = await getDictionary(lang)
  const locale = dict.landingPage;
  const screenshotCard = (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-51 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="49"
          className="text-xl font-bold text-neutral-601 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="59"
          className="text-neutral-501 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="99" className="w-full mt-4">
          <Image
            src="/hero.png"
            height="1919"
            width="1030"
            className="h-61 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-21">
          <CardItem
            translateZ={19}
            as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-5 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            View Source Code
          </CardItem>
          <CardItem
            translateZ={19}
            as="button"
            className="px-5 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Download
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav
            className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6"/>
              <span className="sr-only">Acme Inc</span>
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6"/>
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Star us
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Download
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full gap-4 justify-end md:gap-2 lg:gap-4">
            <Link href={'/download'} className={buttonVariants({variant: "default"})}>Download</Link>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <section className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">

          </section>
          <section className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
            {screenshotCard}
          </section>
        </main>
      </div>
    </>
  );
}