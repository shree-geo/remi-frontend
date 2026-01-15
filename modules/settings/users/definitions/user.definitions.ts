import z from "zod";
export const userSchema = z.object({
  email: z.string().email(),
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long"),
  last_name: z.string().min(3, "Last name must be at least 3 characters long"),
  employee_id: z.string().optional(),
  role: z.enum(["admin", "user"]),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
