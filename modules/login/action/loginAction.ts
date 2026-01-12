import { catchActionError } from "@/lib/catchActionError";
import { demoAccounts } from "../constants/credentials";
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

    const isValidDemo = demoAccounts.some(
      (acc) => acc.email === data.email && acc.password === data.password
    );

    if (isValidDemo) {
      return {
        ...prevState,
        error: null,
        success: true,
      };
    } else {
      return {
        ...prevState,
        error: {
          email: "Invalid credentials. Only demo accounts can log in.",
        },
        success: false,
      };
    }
  });
}
