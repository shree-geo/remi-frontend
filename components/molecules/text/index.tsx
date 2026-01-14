import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

interface TextPropsBase
  extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, "slot"> {
  slot?: "span" | "p";
  size: "p" | "lead" | "large" | "small";
}
type TextProps = PropsWithChildren<TextPropsBase>;

export default function Text(props: TextProps) {
  const { slot, size, className = "", ...rest } = props;
  const Component = slot || "p";
  const variantClass: Record<TextProps["size"], string> = {
    p: "leading-7 [&:not(:first-child)]:mt-6",
    lead: "text-muted-foreground text-xl",
    large: "text-lg font-semibold",
    small: "text-sm leading-none font-medium",
  };
  return (
    <Component className={cn(variantClass[size], className)} {...rest}>
      {props?.children}
    </Component>
  );
}
