import { ComponentProps } from "react";
import FormElementBottom from "../../FormElementBottom";
import { DatePickerBSComponent } from "./DatePickerBSComponent";

export default function DatePickerBS(
  props: ComponentProps<typeof DatePickerBSComponent>
) {
  return (
    <div className="w-full">
      <DatePickerBSComponent {...props} />
      <FormElementBottom error={props.error} helper={props.helper} />
    </div>
  );
}
