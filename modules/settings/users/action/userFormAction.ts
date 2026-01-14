import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { UserActionState } from "../definitions/type";
import { userSchema } from "../definitions/user.definitions";

export async function userFormAction(
  prevState: UserActionState,
  formData: FormData
) {
  return catchActionError<UserActionState>(async () => {
    const rawData = {
      full_name: formData.get("full_name"),
      role: formData.get("role"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedData = userSchema.parse(rawData);
    const data = validatedData;

    await nextApi.post("/api/settings/users", data);

    return {
      ...prevState,
      success: true,
      message: "User created successfully",
    };
  }, prevState);
}
