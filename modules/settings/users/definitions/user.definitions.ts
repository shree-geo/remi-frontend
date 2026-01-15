import z from "zod";
export const userSchema = z.object({
  email: z
    .string()
    .email("user.error.invalidEmailError")
    .nonempty("user.error.emailError"),
  first_name: z
    .string()
    .min(2, "user.error.minLengthFirstNameError")
    .nonempty("user.error.firstNameError"),
  last_name: z
    .string()
    .min(2, "user.error.minLengthLastNameError")
    .nonempty("user.error.lastNameError"),
  employee_id: z.string().optional(),
  role: z.enum(["admin", "user"], "user.error.roleError"),
  password: z
    .string()
    .min(8, "user.error.minLengthPasswordError")
    .max(64, "user.error.maxLengthPasswordError")
    .nonempty("user.error.passwordError"),
});
