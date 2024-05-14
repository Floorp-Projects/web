import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {Button, buttonVariants} from "@/components/ui/button";
import {FaDiscord, FaGithub, FaTwitter} from 'react-icons/fa';
import ALogo from '@/public/ablaze-logo.svg';
import ThemedImage from "@/components/themed-image";
import LogoDark from "@/public/logo-dark.png";

export default function Footer() {
  return (
    <footer
      className="bottom-0 flex w-full items-center justify-between flex-col p-4 gap-4 border-t bg-background">
      <div className="flex flex-wrap w-full max-w-4xl gap-2 sm:gap-4 sm:justify-around justify-center items-center">
        <ThemedImage
          darkImage={LogoDark}
          lightImage={Logo}
          alt={"logo"}
          rest={{width: 100, height: 50}}
        />
        <Link
          href={'https://ablaze.one'}
          className='mx-6 md:mx-0'
        >
          <Image src={ALogo} alt="ablaze" width={100} height={30}/>
        </Link>
        <p className={'text-center text-sm text-neutral-600 dark:text-gray-50'}>
          &copy;{new Date().getFullYear()} Floorp Browser
        </p>
      </div>
    </footer>
  )
}