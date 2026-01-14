"use client";

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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface IDropdownOption<T> {
  label: string;
  value: T;
}

interface ComboboxElementProps<T> extends React.ComponentProps<typeof Popover> {
  name: string;
  label?: string;
  options: IDropdownOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  value?: T | null;
  className?: string;
  disabled?: boolean;
  labelProps?: React.ComponentProps<typeof Label>;
}

export default function ComboboxElement<T extends string>({
  name,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search an option...",
  options,
  value,
  className,
  disabled = false,
  labelProps,
  ...props
}: ComboboxElementProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<T | null>(
    value || null
  );

  React.useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={name} {...labelProps}>
          {label}
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

        <PopoverContent className="w-full p-0" align="start">
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
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
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
        type="hidden"
        name={name}
        value={selectedValue || ""}
        disabled={disabled}
      />
    </div>
  );
}
