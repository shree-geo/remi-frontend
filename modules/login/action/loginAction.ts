import { nextApi } from "@/lib/axios";
import { catchActionError } from "@/lib/catchActionError";
import { handleClientApi } from "@/lib/clientApiHandler";
import { loginSchema } from "../definitions/login.definition";
import { CredentialsType, LoginActionState } from "../definitions/type";

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
) {
  return catchActionError<LoginActionState>(async () => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedData = loginSchema.parse(rawData);
    const data = validatedData;

    const [response, error] = await handleClientApi<CredentialsType>(
      async () => await nextApi.post("/api/auth/login", data),
      { isAuthenticated: false }
    );

    if (error) {
      return {
        ...prevState,
        ...data,
        error: error?.response?.data?.error || null,
        success: false,
        message: "server error",
      };
    }

    if (response) {
      console.log(response);
      return {
        ...prevState,
        ...data,
        data: response.data,
        success: true,
        message: "Login successful",
      };
    }
    return {
      ...prevState,
      ...data,
      success: false,
      message: "Something went wrong",
    };
  }, prevState);
}
