import I18nProvider from "@/contexts/i18n.context";

export default function LangLayout({ children }: LayoutProps<"/[lang]">) {
  return <I18nProvider>{children}</I18nProvider>;
}
