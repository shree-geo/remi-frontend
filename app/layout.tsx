import type { Metadata } from "next";
import "./globals.css";

import I18nProvider from "@/contexts/i18n.context";
import { getT } from "@/i18n";
import { Geist, Geist_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT("common", undefined);

  return {
    title: t("brand.name"),
    description: t("brand.slogan"),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
