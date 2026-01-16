"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { ComponentProps } from "react";
import CTranslation from "../translations/CTranslation";
import FormElementBottom from "./FormElementBottom";

interface InputElementProps extends ComponentProps<typeof InputGroupInput> {
  label: TranslationDefinition;
  error?: TranslationDefinition | string | string[];
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
            <CTranslation {...label} />
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
