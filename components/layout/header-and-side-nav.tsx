import Link from "next/link";
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button, buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import {ThemeSwitch} from "@/components/theme-switch";
import {cn} from "@/lib/utils";
import LanguageSelect from "@/components/language-select";

type HeaderAndSideNavProps = {
  selectTitle: string;
  lang: string;
}

export default function HeaderAndSideNav({selectTitle, lang}: HeaderAndSideNavProps) {
  return (
    <header className="top-0 z-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={Logo} alt="logo" width={100} height={50} />
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
              href={`/${lang}`}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={Logo} alt="logo" width={100} height={50} />
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
        <LanguageSelect res={{dropdownTitle: selectTitle}} />
        <ThemeSwitch />
        <Link href={`/${lang}/download`}
              className={cn(
                buttonVariants({variant: "default"})
              )}
        >Download</Link>
      </div>
    </header>
  )
}