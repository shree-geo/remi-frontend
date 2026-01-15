"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { ComponentProps, useState } from "react";
import CTranslation from "../translations/CTranslation";
import FormElementBottom from "./FormElementBottom";

interface InputElementProps extends ComponentProps<typeof InputGroupInput> {
  label: TranslationDefinition;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
}

export default function PasswordInputElement(props: InputElementProps) {
  const { label, required, error, helper, type = "password", ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <InputGroup>
        <InputGroupInput
          type={isPassword && showPassword ? "text" : type}
          {...rest}
        />

        <InputGroupAddon align="inline-start">
          <Label className="flex items-center gap-2">
            <CTranslation {...label} />
            {required && (
              <InputGroupText className="text-rose-600">*</InputGroupText>
            )}
          </Label>
        </InputGroupAddon>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="m-2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
          </button>
        )}
      </InputGroup>

      <FormElementBottom error={error} helper={helper} />
    </div>
  );
}
