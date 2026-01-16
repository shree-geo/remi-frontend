import { z } from "zod";

export const passwordSchema = z
  .object({
    old_password: z
      .string()
      .min(6, "error.minLengthPasswordError")
      .max(20, "error.maxLengthPasswordError")
      .nonempty("error.oldPasswordError"),
    password: z
      .string()
      .min(6, "error.minLengthPasswordError")
      .max(20, "error.maxLengthPasswordError")
      .nonempty("error.passwordError")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "error.passwordRegexError"
      ),
    password_confirmation: z
      .string()
      .min(6, "error.minLengthPasswordConfirmationError")
      .max(20, "error.maxLengthPasswordConfirmationError")
      .nonempty("error.confirmPasswordError"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "error.passwordConfirmationError",
    path: ["password_confirmation"],
  })
  .refine((data) => data.old_password !== data.password, {
    message: "error.passwordSameAsOldError",
    path: ["password"],
  });
