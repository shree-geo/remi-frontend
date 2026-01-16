import { AxiosError } from "axios";
import z from "zod";

export async function catchActionError<
  T extends Record<string, unknown> | undefined = Record<string, unknown>
>(cb: () => Promise<T>, state?: T): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    console.log("CATCH ACTION ERROR", error);
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc, curr) => {
        acc[String(curr.path[0])] = curr.message || "";
        return acc;
      }, {} as Record<string, string>);
      return {
        ...state,
        error: errors,
        message: "Validation error. Please check your input.",
        success: false,
      } as unknown as T;
    } else if (error instanceof AxiosError) {
      return {
        ...state,
        error: error.response?.data,
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        success: false,
      } as unknown as T;
    } else {
      return {
        ...state,
        error: {},
        message: "Something went wrong. Please try again.",
        success: false,
      } as unknown as T;
    }
  }
}
