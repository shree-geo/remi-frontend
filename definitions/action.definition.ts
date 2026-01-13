export type ActionState<T extends Record<string, unknown> | undefined> = T & {
  error: Partial<Record<keyof T, string | string[]>> | null;
  message: string;
  success: boolean;
};
