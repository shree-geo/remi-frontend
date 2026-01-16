"use client";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import CTranslation from "../translations/CTranslation";

interface FormElementBottomProps {
  error?: TranslationDefinition | string | string[];
  helper?: TranslationDefinition | string;
}

export default function FormElementBottom({
  error,
  helper,
}: FormElementBottomProps) {
  return (
    <>
      {error && (
        <div className="flex items-center space-x-2 px-2 pt-1 text-rose-600">
          <AlertCircleIcon className="h-4" />
          {Array.isArray(error) ? (
            error.map((message) => <>{message}</>)
          ) : typeof error === "object" ? (
            <CTranslation {...error} />
          ) : (
            error
          )}
        </div>
      )}

      {helper && (
        <div className="flex items-center space-x-2 px-2 pt-1">
          <InfoIcon className="h-4" />
          {typeof helper === "object" ? <CTranslation {...helper} /> : helper}
        </div>
      )}
    </>
  );
}
