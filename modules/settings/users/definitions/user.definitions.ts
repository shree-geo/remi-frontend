import z from "zod";
export const userSchema = z.object({
  email: z.email(),
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long"),
  last_name: z.string().min(3, "Last name must be at least 3 characters long"),
  employee_id: z.string().optional(),
  role: z.enum(["admin", "user"]),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export interface User extends Record<string, unknown> {
  id: string;
  email: string;
  username: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
  role_name: string;
  office_level: string;
  location: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  is_approved: boolean;
  last_login: string;
  created_at: string;
}
