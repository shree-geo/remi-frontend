import { ComponentProps } from "react";
import FormElementBottom from "../../FormElementBottom";
import { DatePickerADComponent } from "./DatePickerADComponent";

export default function DatePickerAD(
  props: ComponentProps<typeof DatePickerADComponent>,
) {
  return (
    <div className="w-full">
      <DatePickerADComponent {...props} />
      <FormElementBottom error={props.error} helper={props.helper} />
    </div>
  );
}
