import { handleApi } from "@/lib/apiHandler";
import { catchActionError } from "@/lib/catchActionError";
import { UserActionState, UserType } from "../definitions/type";
import { userSchema } from "../definitions/user.definitions";

export async function createUserAction(
  prevState: UserActionState,
  formData: FormData
) {
  return catchActionError<UserActionState>(async () => {
    const rawData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirm: formData.get("password_confirm"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      employee_id: formData.get("employee_id"),
      role: formData.get("role"),
      phone: formData.get("phone"),
    };
    const validatedData = userSchema.parse(rawData);
    const data = validatedData;
    console.log("data", data);

    const [response, error] = await handleApi<UserType>({
      url: "/users/",
      method: "post",
      data,
    });

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
