"use client";
import i18next from "./i18next";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const runsOnServerSide = typeof window === "undefined";

export function useT(
  ns: string | string[],
  options: { keyPrefix?: string } | undefined
) {
  const lng = useParams()?.lng;
  const hasChangedLanguage = useRef(false);

  if (typeof lng !== "string") {
    throw new Error("useT is only available inside /app/[lng]");
  }

  // Handle server-side language change
  if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng);
  }

  // Client-side: sync language when lng param changes
  useEffect(() => {
    if (runsOnServerSide) return;
    if (!lng || i18next.resolvedLanguage === lng) return;

    i18next.changeLanguage(lng);
    hasChangedLanguage.current = true;
  }, [lng]);

  return useTranslation(ns, options);
}
