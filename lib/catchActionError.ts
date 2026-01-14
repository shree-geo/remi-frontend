import { ActionState } from "@/definitions/action.definition";
import { AxiosError } from "axios";
import z from "zod";

export async function catchActionError<
  T extends Record<string, unknown> | undefined = Record<string, unknown>
>(
  cb: () => Promise<ActionState<T>>,
  prevState?: T,
  currentData?: T
): Promise<ActionState<T>> {
  try {
    return await cb();
  } catch (error) {
    console.error("Action Error caught:", error);
    const baseState = { ...(prevState || {}), ...(currentData || {}) } as T;
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc, curr) => {
        acc[String(curr.path[0])] = curr.message || "";
        return acc;
      }, {} as Record<string, string>);
      return {
        ...baseState,
        error: errors,
        message: "Validation error. Please check your input.",
        success: false,
      } as ActionState<T>;
    } else if (error instanceof AxiosError) {
      return {
        ...baseState,
        error: error.response?.data,
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        success: false,
      } as ActionState<T>;
    } else {
      return {
        ...baseState,
        error: {},
        message: "Something went wrong. Please try again.",
        success: false,
      } as ActionState<T>;
    }
  }
}
