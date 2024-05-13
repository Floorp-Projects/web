"use client"

import * as React from "react"
import {RiSunFill, RiMoonLine} from "@remixicon/react";
import {useTheme} from "next-themes"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AbsoluteDiv({children}: { children: React.ReactNode }) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden h-5 w-5">
      {children}
    </div>
  )
}

export function ThemeSwitch() {
  const {setTheme} = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" paddingH={"sm"} className="relative">
          <div className="h-5 w-5"></div>
          <AbsoluteDiv>
            <RiSunFill
              className="h-5 w-5 scale-100 dark:scale-50 rotate-0 transition-all dark:-rotate-90 hover:rotate-6 translate-y-0 dark:-translate-y-5 duration-1000"/>
          </AbsoluteDiv>
          <AbsoluteDiv>
            <RiMoonLine
              className="h-5 w-5 translate-y-5 transition-all duration-1000 dark:rotate-0 dark:translate-y-0"/>
          </AbsoluteDiv>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}