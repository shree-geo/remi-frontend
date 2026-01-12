import { useT } from "@/i18n/client";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";

interface CTranslationPropsBase extends Record<string, unknown> {
  tKey: string;
  ns?: string;
  options?: { keyPrefix?: string };
  slot?: ComponentType<{ children: ReactNode }> | string;
}

export default function CTranslation(
  props: PropsWithChildren<CTranslationPropsBase>
) {
  const { slot, ns, options, tKey, ...rest } = props;
  const Component = slot || "p";
  const { t } = useT(ns || "common", options);
  return <Component {...rest}>{t(tKey)}</Component>;
}
