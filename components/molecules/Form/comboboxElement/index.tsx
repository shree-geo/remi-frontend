import { TranslationDefinition } from "@/definitions/translation.definition";
import FormElementBottom from "../FormElementBottom";
import ComboboxInput, { ComboboxInputProps } from "./comboboxInput";

export interface ComboboxElementProps<T extends string>
  extends ComboboxInputProps<T> {
  error?: TranslationDefinition | string;
  helper?: TranslationDefinition | string;
}

export default function ComboboxElement<T extends string>(
  props: ComboboxElementProps<T>
) {
  return (
    <div>
      <ComboboxInput {...props} />
      <FormElementBottom error={props.error} helper={props.helper} />
    </div>
  );
}
