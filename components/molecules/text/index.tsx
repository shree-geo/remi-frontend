import { cn } from "@/lib/utils";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";

interface TextPropsBase {
  slot?: ComponentType<{ className?: string; children?: ReactNode }> | string;
  size: "p" | "Lead" | "Large" | "Small";
}

type TextProps = PropsWithChildren<TextPropsBase>;

export default function Text(props: TextProps) {
  const Component = props?.slot || "p";
  const variantClass: Record<TextProps["size"], string> = {
    p: "leading-7 [&:not(:first-child)]:mt-6",
    Lead: "text-muted-foreground text-xl",
    Large: "text-lg font-semibold",
    Small: "text-sm leading-none font-medium",
  };
  return (
    <Component className={cn(variantClass[props.size])}>
      {props?.children}
    </Component>
  );
}
