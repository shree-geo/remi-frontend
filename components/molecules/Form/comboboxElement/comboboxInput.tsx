"use client";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface IDropdownOption<T> {
  label: string;
  value: T;
}

export interface ComboboxInputProps<T>
  extends Omit<React.ComponentProps<typeof Popover>, "onOpenChange"> {
  name: string;
  id?: string;
  label?: TranslationDefinition;
  options: IDropdownOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  className?: string;
  disabled?: boolean;
  labelProps?: React.ComponentProps<typeof Label>;
  required?: boolean;
  error?: TranslationDefinition | string;
  buttonClassName?: string;
  emptyMessage?: string;
  noResultsMessage?: string;
}

export default function ComboboxInput<T extends string>({
  name,
  id,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search an option...",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  disabled = false,
  labelProps,
  required = false,
  error,
  buttonClassName,
  emptyMessage = "No options available.",
  noResultsMessage = "No matching options.",
  ...popoverProps
}: ComboboxInputProps<T>) {
  const isControlled = controlledValue !== undefined;

  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<T | null>(
    defaultValue ?? null
  );

  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  const selectedValue = isControlled ? controlledValue : internalValue;

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );

  const handleSelect = (newValue: T) => {
    const valueToSet = newValue === selectedValue ? null : newValue;

    if (!isControlled) {
      setInternalValue(valueToSet);
    }

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = valueToSet || "";

      const event = new Event("change", { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }

    onChange?.(valueToSet);

    setOpen(false);
  };

  const inputId = id || name;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={inputId} {...labelProps}>
          <CTranslation {...label} />
          {required && <span className="text-rose-600">*</span>}
        </Label>
      )}

      <Popover
        open={open}
        onOpenChange={disabled ? undefined : setOpen}
        {...popoverProps}
      >
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-invalid={!!error}
            aria-required={required}
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              !selectedValue && "text-muted-foreground",
              error && "border-red-500 focus:ring-red-500",
              buttonClassName
            )}
          >
            <span className="truncate">
              {selectedOption?.label || placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>
                {options.length === 0 ? emptyMessage : noResultsMessage}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue as T);
                    }}
                  >
                    <span className="flex-1">{option.label}</span>
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4",
                        selectedValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        id={`${inputId}-hidden`}
        defaultValue={selectedValue || ""}
        required={required}
        disabled={disabled}
        aria-hidden="true"
      />
    </div>
  );
}
