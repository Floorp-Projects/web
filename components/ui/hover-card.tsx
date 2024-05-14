"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const hoverCardContentVariants = cva(
  "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        default: "w-64",
        sm: "w-48",
        lg: "w=72 sm:w-80",
        xl: "w-72 sm:w-96",
        xxl: "w-72 sm:w-[34rem]",
      },
    },
    defaultVariants: {
      size: "default",
    }
  }
)

export interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>,
    VariantProps<typeof hoverCardContentVariants> {
}

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({className, align = "center", size, sideOffset = 4, ...props}, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(hoverCardContentVariants({size, className}))}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export {HoverCard, HoverCardTrigger, HoverCardContent}

