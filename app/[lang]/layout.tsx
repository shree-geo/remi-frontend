import { Toaster } from "@/components/ui/sonner";
import I18nProvider from "@/contexts/i18n.context";

export default function LangLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <I18nProvider>
      {children}
      <Toaster position="top-center" />
    </I18nProvider>
  );
}
