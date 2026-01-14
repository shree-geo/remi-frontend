import { ActionState } from "@/definitions/action.definition";
import { catchActionError } from "@/lib/catchActionError";

export default function createUserAction(
  prevState: ActionState<undefined>,
  formData: FormData
) {
  return catchActionError<ActionState<undefined>>(async () => {
    const formValues = {
      first_name: formData.get("first_name"),
      date: formData.get("date"),
    };
    console.log("FORM VALUES", formValues);
    return {
      ...prevState,
      success: true,
      message: "User created successfully",
    };
  }, prevState);
}
