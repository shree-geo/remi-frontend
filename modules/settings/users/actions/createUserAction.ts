import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { UserActionState } from "../definitions/type";
import { userSchema } from "../definitions/user.definitions";

export async function createUserAction(
  prevState: UserActionState,
  formData: FormData,
) {
  return catchActionError<UserActionState>(async () => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      employee_id: formData.get("employee_id"),
      role: formData.get("role"),
    };
    const validatedData = userSchema.parse(rawData);
    const data = validatedData;
    console.log("data", data);

    const response = await nextApi.post("/user", data);

    return {
      ...prevState,
      data: response.data,
      success: true,
      message: "Login successful",
    };
  });
}
