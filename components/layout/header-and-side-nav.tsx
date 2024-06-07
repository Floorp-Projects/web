import Link from "next/link";
import {RiDiscordFill, RiGithubFill, RiMenuUnfoldLine, RiStarLine, RiTwitterXFill} from "@remixicon/react"
import {Sheet, SheetContent, SheetTrigger} from "@/toolkit/components/ui/sheet";
import {Button, buttonVariants} from "@/toolkit/components/ui/button";
import Logo from "@/public/logo.png";
import LogoDark from "@/public/logo-dark.png";
import {ThemeSwitch} from "@/toolkit/components/theme-switch";
import {cn} from "@/lib/utils";
import LanguageSelect from "@/components/language-select";
import {Locale} from "@/i18n/i18n.config";
import {getDictionary} from "@/i18n/dictionaries";
import ThemedImage from "@/toolkit/components/themed-image";
import {FaDiscord, FaGithub, FaTwitter} from "react-icons/fa";

type HeaderAndSideNavProps = {
  lang: Locale;
}

const linkClasses = "text-muted-foreground hover:text-foreground flex flex-row gap-2 items-center";

export default async function HeaderAndSideNav({lang}: HeaderAndSideNavProps) {
  const dict = await getDictionary(lang);
  return (
    <header className="top-0 z-0 flex h-16 justify-center items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-row w-full max-w-4xl justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="shrink-0 md:hidden"
              paddingH="sm"
            >
              <RiMenuUnfoldLine className="h-5 w-5"/>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href={`/${lang}`}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <ThemedImage
                  darkImage={LogoDark}
                  lightImage={Logo}
                  alt={"logo"}
                  className={'w-32'}
                />
                <span className="sr-only">Floorp</span>
              </Link>
              <Link
                href="https://github.com/Floorp-Projects/Floorp"
                className={linkClasses}
              >
                {dict.components.starUs} <RiStarLine className="h-5 w-5" color="yellow"/>
              </Link>
              <Link href={`/${lang}/download`} className="text-muted-foreground hover:text-foreground">
                {dict.components.header.links.download}
              </Link>
              <Link href="https://github.com/floorp-Projects/floorp/" className={linkClasses}>
                <RiGithubFill className="h-5 w-5"/> GitHub
              </Link>
              <Link href="https://aka.ablaze.one/discord" className={linkClasses}>
                <RiDiscordFill className="h-5 w-5"/> Discord
              </Link>
              <Link href="https://twitter.com/Floorp_Browser" className={linkClasses}>
                <RiTwitterXFill className="h-5 w-5"/>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <nav
          className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <ThemedImage
              darkImage={LogoDark}
              lightImage={Logo}
              alt={"logo"}
              className={'w-32'}
            />
            <span className="sr-only">Floorp</span>
          </Link>
        </nav>
        <div className="flex gap-4 md:gap-2 lg:gap-4 justify-end">
          <div className={'gap-2 flex-row hidden md:flex'}>
            <Link href="https://aka.ablaze.one/discord" className={buttonVariants({variant: 'ghost'})}>
              <FaDiscord/>
            </Link>
            <Link href="https://twitter.com/Floorp_Browser" className={buttonVariants({variant: 'ghost'})}>
              <FaTwitter/>
            </Link>
            <Link href="https://github.com/floorp-Projects/floorp/" className={buttonVariants({variant: 'ghost'})}>
              <FaGithub/>
            </Link>
          </div>
          <LanguageSelect
            languageSelect={dict.components.languageSelect}
            inReview={dict.components.inReview}
            waitingForContributions={dict.components.waitingForContributions}
          />
          <ThemeSwitch/>
          <Link href={`/${lang}/download`}
                className={cn(
                  buttonVariants({variant: "default"})
                )}
          >{dict.components.header.links.download}</Link>
        </div>
      </div>
    </header>
  )
}