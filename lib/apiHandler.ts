"use server";
import { IListResponse, IResponse } from "@/definitions/api.definition";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "./auth";
import { api } from "./axios";

type TEMPLATE =
  | (Record<string, unknown> | undefined)
  | Array<Record<string, unknown>>;
type ApiResponse<T extends TEMPLATE> =
  T extends Array<infer U> ? IListResponse<U> : IResponse<T>;

export async function handleApi<T extends TEMPLATE>(
  // cb: (options: {
  //   config: AxiosRequestConfig;
  // }) => Promise<AxiosResponse<ApiResponse<T>>>,
  apiOptions: {
    url: string;
    method: "get" | "post" | "put" | "delete" | "patch";
    data?: T extends Array<infer U> ? U : T;
    isAuthenticated?: boolean;
  }
): Promise<
  [AxiosResponse<ApiResponse<T>> | null, AxiosError<ApiResponse<T>> | null]
> {
  try {
    const { url, method, data, isAuthenticated = true } = apiOptions;
    const headers: AxiosRequestConfig["headers"] = {};
    if (isAuthenticated) {
      const session = await getSession();
      if (!session) throw new AxiosError("Session not found", "UNAUTHORIZED");
      headers.Authorization = `Bearer ${session?.access}`;
    }

    const response = await api({
      url,
      method,
      headers,
      data,
    });
    return [response, null];
  } catch (error) {
    console.log("API ERROR", error);
    return [null, error as AxiosError<ApiResponse<T>>];
  }
}
