export type ActionState<T extends Record<string, unknown>> = T & {
  error: Partial<Record<keyof T, string | string[]>> | null;
  message: string;
  success: boolean;
};
