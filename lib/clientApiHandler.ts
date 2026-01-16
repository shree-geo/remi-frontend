"use client";
import { IListResponse, IResponse } from "@/definitions/api.definition";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "./auth-client";

type TEMPLATE =
  | (Record<string, unknown> | undefined)
  | Array<Record<string, unknown>>;
type ApiResponse<T extends TEMPLATE> =
  T extends Array<infer U> ? IListResponse<U> : IResponse<T>;

export async function handleClientApi<T extends TEMPLATE>(
  cb: (options: {
    config: AxiosRequestConfig;
  }) => Promise<AxiosResponse<ApiResponse<T>>>,
  options: {
    isAuthenticated: boolean;
  } = {
    isAuthenticated: true,
  },
): Promise<
  [AxiosResponse<ApiResponse<T>> | null, AxiosError<ApiResponse<T>> | null]
> {
  try {
    const { isAuthenticated } = options;
    const headers: AxiosRequestConfig["headers"] = {};
    if (isAuthenticated) {
      const session = getSession();
      if (!session) throw new AxiosError("Session not found", "UNAUTHORIZED");
      headers.Authorization = `Bearer ${session?.access}`;
    }

    const response = await cb({
      config: {
        headers,
      },
    });
    return [response, null];
  } catch (error) {
    console.log("API ERROR", error);
    return [null, error as AxiosError<ApiResponse<T>>];
  }
}
