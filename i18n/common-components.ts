import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export const getLink = (href: string, key = 1, rest = {}) => {
  return {
    key: "1",
    type: Link,
    rest: {
      href: href,
      target: "_blank",
      className: buttonVariants({variant: "link", paddingH: "none", paddingV: "none"}), ...rest
    }
  }
}