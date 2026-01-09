import { getT } from "@/i18n";
import { PropsWithChildren } from "react";

export default async function STranslation(
  props: PropsWithChildren<{
    tKey: string;
    slot?: React.ComponentType<{ children: React.ReactNode }> | string;
    ns?: string;
    options?: { keyPrefix?: string };
  }>
) {
  const Component = props.slot || "p";
  const { t } = await getT(props.ns || "common", props.options);
  return <Component>{t(props.tKey)}</Component>;
}
