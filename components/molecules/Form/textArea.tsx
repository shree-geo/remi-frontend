import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { ComponentProps } from "react";
import STranslation from "../translations/STranslation";
import FormElementBottom from "./FormElementBottom";

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
            <STranslation {...label} />
            {required && (
              <InputGroupText className="text-rose-600">*</InputGroupText>
            )}
          </Label>
        </InputGroupAddon>
      </InputGroup>
      <FormElementBottom error={error} helper={helper} />
    </div>
  );
}
