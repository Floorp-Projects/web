"use client";


import {useEffect, useState} from "react";
import {Platform, getPlatform, platformOptions} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function PlatformSelect() {
  const [platform, setPlatform] = useState(0);
  useEffect(() => {
    const ua = navigator.userAgent;
    const _p = getPlatform(ua);
    console.log(`Platform: ${_p}`);
    //setPlatform(_p);
  }, []);

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="btn btn-primary">Select platform</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(platformOptions).map((key) => {
          const platform = platformOptions[key];
          return <DropdownMenuItem key={key}>{platform}</DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}