import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "./auth";

export async function handleApi(
  cb: (options: { config: AxiosRequestConfig }) => Promise<AxiosResponse>,
  options: {
    isAuthenticated: boolean;
  } = {
    isAuthenticated: true,
  }
): Promise<[AxiosResponse | null, AxiosError | null]> {
  try {
    const { isAuthenticated } = options;
    const headers: AxiosRequestConfig["headers"] = {};
    if (isAuthenticated) {
      const session = await getSession();
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
    return [null, error as AxiosError];
  }
}
