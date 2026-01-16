"use client";

import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import FormElementBottom from "../../FormElementBottom";

export interface DatePickerADProps {
  label?: TranslationDefinition | string;
  name?: string;
  id?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (date: string | undefined) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
}

export function DatePickerBSComponent({
  name = "date",
  id,
  label,
  defaultValue,
  value: controlledValue,
  onChange,
  required = false,
  className,
  error,
  helper,
}: DatePickerADProps) {
  const isControlled = controlledValue !== undefined;

  const [internalDate, setInternalDate] = useState<string | undefined>(
    defaultValue
  );

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const date = isControlled ? controlledValue : internalDate;

  const handleSelect = (bsDate: string) => {
    if (!isControlled) {
      setInternalDate(bsDate);
    }

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = bsDate || "";

      const event = new Event("change", { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }

    onChange?.(bsDate);
  };

  return (
    <div className="w-full">
      <InputGroup className={cn(error && "border-red-500 focus:ring-red-500")}>
        <NepaliDatePicker
          className="w-full"
          inputClassName={cn(
            "border border-transparent bg-clip-padding text-sm font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
            "bg-background hover:text-foreground dark:bg-input/30   aria-expanded:text-foreground shadow-xs",
            "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          onChange={handleSelect}
          options={{
            calenderLocale: "en",
            valueLocale: "en",
          }}
        />
        <InputGroupAddon align="inline-start">
          <CalendarIcon />
          {label && typeof label === "string" ? (
            label
          ) : (
            <CTranslation {...(label as TranslationDefinition)} />
          )}
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">BS</InputGroupAddon>
      </InputGroup>

      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        id={id || name}
        defaultValue={date || ""}
        required={required}
        aria-hidden="true"
      />
      <FormElementBottom error={error} helper={helper} />
    </div>
  );
}
