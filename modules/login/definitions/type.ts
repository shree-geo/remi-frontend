import { ActionState } from "@/definitions/action.definition";
import z from "zod";
import { loginSchema } from "./login.definition";

export type CredentialsType = z.infer<typeof loginSchema>;

export type LoginActionState = ActionState<CredentialsType>;
