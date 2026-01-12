import { catchActionError } from "@/lib/catchActionError";
import { accountCredentials } from "../constants/credentials";
import { loginSchema } from "../definitions/login.definition";
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
    const validatedData = loginSchema.parse(rawData);
    const data = validatedData;

    const isValidAccount = accountCredentials.some(
      (acc) => acc.email === data.email && acc.password === data.password
    );

    if (isValidAccount) {
      return {
        ...prevState,
        error: null,
        success: true,
      };
    } else {
      return {
        ...prevState,
        error: {
          email: "emailError",
          password: "passwordError",
        },
        success: false,
      };
    }
  });
}
