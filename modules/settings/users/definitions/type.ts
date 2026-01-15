import { ActionState } from "@/definitions/action.definition";
import z from "zod";
import { userSchema } from "./user.definitions";

export type UserType = z.infer<typeof userSchema>;

export type UserActionState = ActionState<UserType>;
