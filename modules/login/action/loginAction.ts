import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { LoginActionState } from "../definitions/type";

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
) {
  return catchActionError<LoginActionState>(async () => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // const validatedData = loginSchema.parse(rawData);
    // const data = validatedData;

    const response = await nextApi.post("/api/auth/login", rawData);
    console.log(response);

    return {
      ...prevState,
      data: response.data,
      success: true,
      message: "Login successful",
    };
  });
}
