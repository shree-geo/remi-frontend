import { catchActionError } from "@/lib/catchActionError";
import { forgotPasswordSchema } from "../definitions/forgetPassword.definition";
import { ForgotPasswordActionState } from "../definitions/type";

export async function forgotPasswordAction(
  prevState: ForgotPasswordActionState,
  formData: FormData
) {
  return catchActionError<ForgotPasswordActionState>(async () => {
    const rawData = {
      email: formData.get("email"),
    };
    const validatedData = forgotPasswordSchema.parse(rawData);
    const data = validatedData;
    console.log(data);

    return {
      ...prevState,
      error: {
        email: "emailError",
      },
      success: true,
    };
  });
}
