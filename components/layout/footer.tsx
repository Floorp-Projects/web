import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {Button, buttonVariants} from "@/components/ui/button";
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import ALogo from '@/public/ablaze-logo.svg';
import ThemedImage from "@/components/themed-image";
import LogoDark from "@/public/logo-dark.png";

export default function Footer() {
  return (
    <footer className="bottom-0 flex h-48 w-full items-center justify-between flex-col p-6 gap-4 border-t bg-background">
      <div className="flex w-full max-w-4xl gap-4 justify-between items-center">
        <div className={'flex gap-4 items-start justify-end flex-col'}>
          <ThemedImage
            darkImage={LogoDark}
            lightImage={Logo}
            alt={"logo"}
            rest={{width: 100, height: 50}}
          />
        </div>
        <p className={'text-center text-sm text-neutral-600 dark:text-gray-50'}>
          &copy;{new Date().getFullYear()} Floorp Browser
        </p>
      </div>
      <div className="flex w-full gap-4 justify-center items-center md:gap-2 lg:gap-4">
        <Link href={'https://ablaze.one'}>
          <Image src={ALogo} alt="ablaze" width={100} height={30} />
        </Link>
      </div>
    </footer>
  )
}