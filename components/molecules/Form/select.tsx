import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TranslationDefinition } from "@/definitions/translation.definition";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { ComponentProps } from "react";
import CTranslation from "../translations/CTranslation";

interface SelectElementProps extends ComponentProps<typeof SelectGroup> {
  label: TranslationDefinition;
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
  options: { label: string; value: string }[];
  name?: string;
  defaultValue?: string;
}

export function SelectBox(props: SelectElementProps) {
  const { label, helper, error, options, name, defaultValue } = props;
  return (
    <div>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={<CTranslation {...label} />} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.isArray(options) && options.length > 0
              ? options?.map((option, index) => (
                  <SelectItem value={option?.value} key={index}>
                    {option?.label}
                  </SelectItem>
                ))
              : []}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <div className="flex items-center space-x-2 px-2 pt-1 text-rose-600">
          <AlertCircleIcon className="h-4" />
          {typeof error === "object" ? <CTranslation {...error} /> : error}
        </div>
      )}

      {helper && (
        <div className="flex items-center space-x-2 px-2 pt-1">
          <InfoIcon className="h-4" />
          {typeof helper === "object" ? <CTranslation {...helper} /> : helper}
        </div>
      )}
    </div>
  );
}
