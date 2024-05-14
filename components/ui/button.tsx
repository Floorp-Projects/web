import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        rLink: "text-primary underline-offset-4 underline hover:no-underline",
      },
      align: {
        default: "justify-center",
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
      paddingV: {
        default: "py-2",
        sm: "py-1",
        lg: "py-3",
        none: "py-0",
      },
      paddingH: {
        default: "px-4",
        sm: "px-3",
        lg: "px-8",
        none: "px-0",
      },
      size: {
        default: "h-10",
        sm: "h-9 rounded-md",
        lg: "h-11 rounded-md",
        icon: "h-10 w-10",
        auto: "h-auto w-auto",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      align: "default",
      paddingV: "default",
      paddingH: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, align, paddingV, paddingH, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({paddingV, align, paddingH, variant, size, className}))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export {Button, buttonVariants}
