import { ActionState } from "@/definitions/action.definition";
import z from "zod";
import { passwordSchema } from "./password.definitions";
import { profileSchema } from "./profile.definitions";

export type ProfileType = z.infer<typeof profileSchema>;

export type ProfileActionState = ActionState<ProfileType>;

export type PasswordType = z.infer<typeof passwordSchema>;

export type PasswordActionState = ActionState<PasswordType>;
