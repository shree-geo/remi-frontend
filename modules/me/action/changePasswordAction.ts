import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { passwordSchema } from "../definitions/password.definitions";
import { PasswordActionState } from "../definitions/type";

export async function changePasswordAction(
  prevState: PasswordActionState,
  formData: FormData
) {
  return catchActionError<PasswordActionState>(async () => {
    const rawData = {
      old_password: formData.get("old_password"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    };
    const validatedData = passwordSchema.parse(rawData);
    const data = validatedData;
    console.log("data", data);

    const response = await nextApi.put("/me/change-password", data);

    return {
      ...prevState,
      data: response.data,
      success: true,
      message: "Password updated successfully",
    };
  });
}
