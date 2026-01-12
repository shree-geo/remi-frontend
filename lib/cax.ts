import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
import { APP_CONFIG } from "./constants";

interface CaxOptions {
  baseURL?: string;
  onLogout?: () => void;
  onTokenUpdate?: (access: string) => void;
  token?: string; // For server-side: pass token explicitly
  refreshToken?: string; // For server-side: pass refresh token explicitly
}

// Helper to safely get token from client-side storage
const getClientToken = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return Cookies.get(key) || localStorage.getItem(key);
  } catch {
    return null;
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

const decodeJwt = (token: string): { exp?: number } | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const isExpired = (token?: string | null) => {
  if (!token) return true;
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
};

const setAuthHeader = (config: AxiosRequestConfig, token: string) => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers = new AxiosHeaders({
      ...config.headers,
      Authorization: `Bearer ${token}`,
    });
  }
};

export function createAxiosClient(options: CaxOptions = {}): AxiosInstance {
  const {
    baseURL = process.env.NEXT_PUBLIC_API_URL,
    onLogout,
    onTokenUpdate,
    token: serverToken,
    refreshToken: serverRefreshToken,
  } = options;

  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
    // Priority: 1. Server-side token (passed explicitly)
    //           2. Client-side token (from cookies/localStorage)
    const token = serverToken || getClientToken(APP_CONFIG.tokenKey);

    if (token && !isExpired(token)) {
      setAuthHeader(config, token);
    }
    return config;
  });

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(normalizeError(error));
      }

      // On server-side, we can't refresh tokens automatically
      // The calling code should handle token refresh
      if (typeof window === "undefined") {
        return Promise.reject(normalizeError(error));
      }

      // Get refresh token from server options or client storage
      const refreshToken =
        serverRefreshToken || getClientToken(APP_CONFIG.refreshTokenKey);

      if (!refreshToken || isExpired(refreshToken)) {
        onLogout?.();
        return Promise.reject(normalizeError(error));
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              setAuthHeader(originalRequest, token);
              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(`${baseURL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = refreshRes.data?.data?.access;
        if (!newAccess) throw error;

        // Only save to localStorage on client-side
        if (typeof window !== "undefined") {
          localStorage.setItem(APP_CONFIG.tokenKey, newAccess);
        }
        onTokenUpdate?.(newAccess);

        processQueue(null, newAccess);
        isRefreshing = false;

        setAuthHeader(originalRequest, newAccess);

        return instance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err as AxiosError);
        onLogout?.();
        return Promise.reject(normalizeError(err as AxiosError));
      }
    }
  );

  return instance;
}

interface ApiErrorPayload {
  message?: string;
  error?: string;
}

function normalizeError(error: AxiosError) {
  const data = error.response?.data as ApiErrorPayload | undefined;

  return {
    status: error.response?.status ?? 500,
    message: data?.message ?? data?.error ?? "Something went wrong",
    raw: error,
  };
}
