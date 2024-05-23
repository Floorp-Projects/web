import React from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";

type ThemedImageProps = {
  // TODO: Fix the type of darkImage and lightImage to be StaticImageData
  darkImage: React.ReactNode | any;
  // TODO: Fix the type of darkImage and lightImage to be StaticImageData
  lightImage: React.ReactNode | any;
  alt: string;
  className?: string;
  rest?: object;
}

const darkClasses = "hidden dark:block"
const lightClasses = "block dark:hidden"

export default function ThemedImage({darkImage, lightImage, alt, rest, className}: ThemedImageProps) {
  const getDark = () => {
    if (React.isValidElement(darkImage)) {
      return <div className={cn(darkClasses, className)}>{darkImage}</div>
    }

    return <Image src={darkImage} alt={alt} className={cn(darkClasses, className)} {...rest} />;
  }

  const getLight = () => {
    if (React.isValidElement(lightImage)) {
      return <div className={cn(lightClasses, className)}>{lightImage}</div>
    }

    return <Image src={lightImage} alt={alt} className={cn(lightClasses, className)} {...rest} />;
  }

  return (
    <>
      {getDark()}
      {getLight()}
    </>
  )
}