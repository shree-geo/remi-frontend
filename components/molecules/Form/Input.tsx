import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { ComponentProps } from "react";
import STranslation from "../translations/STranslation";

interface InputElementProps extends ComponentProps<typeof InputGroupInput> {
  label: TranslationDefinition;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
}

export default function InputElement(props: InputElementProps) {
  const { label, required, error, helper, type = "text", ...rest } = props;
  return (
    <div>
      <InputGroup>
        <InputGroupInput type={type} {...rest} />
        <InputGroupAddon align="inline-start">
          <Label>
            <STranslation {...label} />
          </Label>
        </InputGroupAddon>
        {required && (
          <InputGroupAddon align="inline-end">
            <InputGroupText className="text-rose-600">*</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>

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
    </div>
  );
}
