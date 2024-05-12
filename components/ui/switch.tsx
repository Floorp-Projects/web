"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ",
  {
    variants: {
      alwaysActive: {
        true: "bg-primary",
        false: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      }
    },
    defaultVariants: {
      alwaysActive: false
    },
  }
)

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  alwaysActive?: boolean
}

const movement = "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0";

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>
(({className, alwaysActive, ...props}, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({alwaysActive, className}))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(movement)}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export {Switch}
