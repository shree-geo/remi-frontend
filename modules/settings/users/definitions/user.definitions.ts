import z from "zod";
export const userSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(150, "Username must be at most 150 characters long"),
    email: z.string().email(),
    first_name: z
      .string()
      .min(3, "First name must be at least 3 characters long"),
    last_name: z
      .string()
      .min(3, "Last name must be at least 3 characters long"),
    employee_id: z.string().min(1, "Employee ID is required"),
    role: z.enum(["admin", "user"]),
    phone: z
      .string()
      .min(6, "Phone number must be at least 6 digits long")
      .max(15, "Phone number must be at most 15 digits long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    password_confirm: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });
