"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerADProps {
  name?: string;
  id?: string;
  defaultValue?: Date | string;
  value?: Date | string;
  onChange?: (date: Date | undefined) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePickerAD({
  name = "date",
  id,
  defaultValue,
  value: controlledValue,
  onChange,
  required = false,
  placeholder = "Pick a date",
  disabled = false,
  className,
  error,
  minDate,
  maxDate,
}: DatePickerADProps) {
  const isControlled = controlledValue !== undefined;

  const getDateValue = (val: Date | string | undefined): Date | undefined => {
    if (!val) return undefined;
    return val instanceof Date ? val : new Date(val);
  };

  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    getDateValue(defaultValue)
  );

  const hiddenInputRef = React.useRef<HTMLInputElement>(null);

  const date = isControlled ? getDateValue(controlledValue) : internalDate;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(selectedDate);
    }

    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = selectedDate
        ? selectedDate.toISOString()
        : "";

      const event = new Event("change", { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }

    onChange?.(selectedDate);
  };

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            data-empty={!date}
            aria-invalid={!!error}
            aria-required={required}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              if (disabled) return true;
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
          />
        </PopoverContent>
      </Popover>

      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        id={id || name}
        defaultValue={date ? date.toISOString() : ""}
        required={required}
        aria-hidden="true"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
