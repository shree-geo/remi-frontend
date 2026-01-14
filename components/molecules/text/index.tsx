import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

type TextSize = "p" | "lead" | "large" | "small";
interface TextPropsBase
  extends Omit<HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>, "slot"> {
  slot?: "span" | "p";
  size?: TextSize;
}
type TextProps = PropsWithChildren<TextPropsBase>;

export default function Text(props: TextProps) {
  const { slot, size = "p", className = "", ...rest } = props;
  const Component = slot || "p";
  const variantClass: Record<TextSize, string> = {
    p: "leading-7 [&:not(:first-child)]:mt-6",
    lead: "text-muted-foreground text-xl",
    large: "text-lg font-semibold",
    small: "text-sm leading-none",
  };
  return (
    <Component className={cn(variantClass[size], className)} {...rest}>
      {props?.children}
    </Component>
  );
}
