import React from "react";
import Image from "next/image";

type ThemedImageProps = {
  // TODO: Fix the type of darkImage and lightImage to be StaticImageData
  darkImage: React.ReactNode | any;
  // TODO: Fix the type of darkImage and lightImage to be StaticImageData
  lightImage: React.ReactNode | any;
  alt: string;
  rest?: object;
}

export default function ThemedImage({darkImage, lightImage, alt, rest}: ThemedImageProps) {
  const getDark = () =>{
    if (React.isValidElement(darkImage)) {
      return darkImage;
    }

    return <Image src={darkImage} alt={alt} {...rest} />;
  }

  const getLight = () => {
    if (React.isValidElement(lightImage)) {
      return lightImage;
    }

    return <Image src={lightImage} alt={alt} {...rest} />;
  }
  return (
    <>
      <div className="dark:hidden">{getLight()}</div>
      <div className="hidden dark:block">{getDark()}</div>
    </>
  )
}