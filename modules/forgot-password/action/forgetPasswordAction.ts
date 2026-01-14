import { nextApi } from "@/lib/axios";
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
    const response = await nextApi.post("/api/forgot-password", data);
    console.log(response);

    return {
      ...prevState,
      message: response.data.message,
      error: {
        email: "emailError",
      },
      success: true,
    };
  });
}
