import { cn } from "@/lib/utils";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";

interface TitlePropsBase {
  slot?: ComponentType<{ className?: string; children?: ReactNode }> | string;
  size: "h1" | "h2" | "h3" | "h4";
}

type TitleProps = PropsWithChildren<TitlePropsBase>;

export default function Title(props: TitleProps) {
  const Component = props?.slot || "h1";
  const variantClass: Record<TitleProps["size"], string> = {
    h1: "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  };
  return (
    <Component className={cn(variantClass[props.size])}>
      {props?.children}
    </Component>
  );
}
