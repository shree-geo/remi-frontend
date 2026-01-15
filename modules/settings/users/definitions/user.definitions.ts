import z from "zod";
export const userSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(3),
  role: z.enum(["admin", "user"]),
  password: z.string().min(8),
});
