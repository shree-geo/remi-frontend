import { TranslationDefinition } from "@/definitions/translation.definition";
import { getT } from "@/i18n";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";

interface STranslationPropsBase extends TranslationDefinition {
  slot?: ComponentType<{ children: ReactNode }> | string;
}

export default async function STranslation(
  props: PropsWithChildren<STranslationPropsBase>
) {
  const { slot, ns, options, tKey, ...rest } = props;
  const Component = slot || "p";
  const { t } = await getT(ns || "common", options);
  return <Component {...rest}>{t(tKey)}</Component>;
}
