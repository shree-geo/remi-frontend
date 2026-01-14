export type ActionState<T extends Record<string, unknown> | undefined> = {
  error: T extends undefined
    ? null
    : Partial<Record<keyof T, string | string[]>> | null;
  message: string;
  success: boolean;
} & (T extends undefined ? object : T);
