import { ActionState } from "@/definitions/action.definition";
import { catchActionError } from "@/lib/catchActionError";

export default async function createExampleAction(
  prevState: ActionState<undefined>,
  formData: FormData
) {
  console.log("FORM VALUES", formData, prevState);

  return catchActionError<ActionState<undefined>>(async () => {
    const formValues = {
      first_name: formData.get("first_name"),
      date: formData.get("date"),
      fruit: formData.get("fruit"),
    };
    console.log("FORM VALUES", formValues);
    return {
      ...prevState,
      success: true,
      message: "User created successfully",
    } as ActionState<undefined>;
  }, prevState);
}
