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
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface IDropdownOption<T> {
  label: string;
  value: T;
}

export interface ComboboxInputProps<T>
  extends React.ComponentProps<typeof Popover> {
  name: string;
  label?: TranslationDefinition;
  options: IDropdownOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: T | null;
  className?: string;
  disabled?: boolean;
  labelProps?: React.ComponentProps<typeof Label>;
  required?: boolean;
}

export default function ComboboxInput<T extends string>({
  name,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search an option...",
  options,
  value,
  className,
  disabled = false,
  labelProps,
  required = false,
  ...props
}: ComboboxInputProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<T | null>(
    value || null
  );

  React.useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={name} {...labelProps}>
          <CTranslation {...label} />
          {required && <span className=" text-rose-600">*</span>}
        </Label>
      )}

      <Popover
        open={open}
        onOpenChange={disabled ? () => {} : setOpen}
        {...props}
      >
        <PopoverTrigger asChild>
          <Button
            id={name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
            <CommandList>
              <CommandEmpty>
                {options.length === 0
                  ? "No options available."
                  : "No matching options."}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      const newValue = currentValue as T;
                      setSelectedValue(newValue);
                      setOpen(false);
                    }}
                    data-checked={selectedValue === option.value}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        name={name}
        value={selectedValue || ""}
        disabled={disabled}
      />
    </div>
  );
}
