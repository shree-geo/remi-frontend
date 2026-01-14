"use client";
import i18next from "@/i18n/i18next";
import { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

export default function I18nProvider({ children }: PropsWithChildren) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
