import { ActionState } from "@/definitions/action.definition";
import z from "zod";
import { forgotPasswordSchema } from "./forgetPassword.definition";

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export type ForgotPasswordActionState = ActionState<ForgotPasswordType>;
