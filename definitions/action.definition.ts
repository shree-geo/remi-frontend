import { IResponseError } from "./api.definition";

export type ActionState<T extends Record<string, unknown> | undefined> = {
  error: IResponseError | null;
  message: string;
  success: boolean;
} & (T extends undefined ? object : T);
