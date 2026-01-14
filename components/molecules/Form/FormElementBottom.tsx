import { TranslationDefinition } from "@/definitions/translation.definition";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import STranslation from "../translations/STranslation";

interface FormElementBottomProps {
  error?: TranslationDefinition | string;
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
          {typeof error === "object" ? <STranslation {...error} /> : error}
        </div>
      )}

      {helper && (
        <div className="flex items-center space-x-2 px-2 pt-1">
          <InfoIcon className="h-4" />
          {typeof helper === "object" ? <STranslation {...helper} /> : helper}
        </div>
      )}
    </>
  );
}
