import { ActionState } from "@/definitions/action.definition";
import { catchActionError } from "@/lib/catchActionError";

const initialState: ActionState<undefined> = {
  success: false,
  message: "",
  error: null,
};

export default function createUserAction(
  prevState: ActionState<undefined> | undefined,
  formData: FormData
) {
  const safeState = prevState ?? initialState;

  return catchActionError<ActionState<undefined>>(async () => {
    const formValues = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      role: formData.get("role"),
      password: formData.get("password"),
    };

    console.log("FORM VALUES", formValues);

    return {
      ...safeState,
      success: true,
      message: "User created successfully",
    };
  }, safeState);
}
