import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { ComponentProps } from "react";
import CTranslation from "../translations/CTranslation";

interface InputElementProps extends ComponentProps<typeof InputGroupTextarea> {
  label: TranslationDefinition;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
}

export default function TextAreaElement(props: InputElementProps) {
  const { label, required, error, helper, ...rest } = props;
  return (
    <div>
      <InputGroup>
        <InputGroupTextarea {...rest} />
        <InputGroupAddon align="block-start">
          <Label>
            <CTranslation {...label} />
            {required && (
              <InputGroupText className="text-rose-600">*</InputGroupText>
            )}
          </Label>
        </InputGroupAddon>
      </InputGroup>

      {error && (
        <div className="flex items-center space-x-2 px-2 pt-1 text-rose-600">
          <AlertCircleIcon className="h-4" />
          {typeof error === "object" ? <CTranslation {...error} /> : error}
        </div>
      )}

      {helper && (
        <div className="flex items-center space-x-2 px-2 pt-1">
          <InfoIcon className="h-4" />
          {typeof helper === "object" ? <CTranslation {...helper} /> : helper}
        </div>
      )}
    </div>
  );
}
