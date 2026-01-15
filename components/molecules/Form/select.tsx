"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { cn } from "@/lib/utils";
import { type ComponentProps, useRef } from "react";
import CTranslation from "../translations/CTranslation";
import FormElementBottom from "./FormElementBottom";

export interface SelectElementProps
  extends Omit<ComponentProps<typeof Select>, "onValueChange"> {
  name: string;
  id?: string;
  label?: TranslationDefinition | string;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  labelProps?: ComponentProps<typeof Label>;
}

export function SelectBox({
  name,
  id,
  label,
  error,
  helper,
  options,
  placeholder,
  value: controlledValue,
  defaultValue,
  onValueChange,
  required = false,
  disabled = false,
  className,
  triggerClassName,
  labelProps,
  ...selectProps
}: SelectElementProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const inputId = id || name;

  const handleValueChange = (newValue: string) => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = newValue;

      const event = new Event("change", { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }

    onValueChange?.(newValue);
  };

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={inputId} {...labelProps}>
          {typeof label === "object" ? <CTranslation {...label} /> : label}
          {required && <span className="text-rose-600">*</span>}
        </Label>
      )}

      <Select
        value={controlledValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        required={required}
        {...selectProps}
      >
        <SelectTrigger
          id={inputId}
          aria-invalid={!!error}
          aria-required={required}
          className={cn(
            "w-full",
            error && "border-red-500 focus:ring-red-500",
            triggerClassName
          )}
        >
          <SelectValue
            placeholder={
              placeholder ||
              (label ? (
                typeof label === "object" ? (
                  <CTranslation {...label} />
                ) : (
                  label
                )
              ) : (
                "Select an option"
              ))
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.isArray(options) && options.length > 0 ? (
              options.map((option, index) => (
                <SelectItem value={option.value} key={option.value || index}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No options available
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        id={`${inputId}-hidden`}
        defaultValue={controlledValue || defaultValue || ""}
        required={required}
        disabled={disabled}
        aria-hidden="true"
      />

      <FormElementBottom error={error} helper={helper} />
    </div>
  );
}
