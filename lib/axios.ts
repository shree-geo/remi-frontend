import type { AxiosError, AxiosResponse } from "axios";
import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (error: AxiosError) => {
    throw error;
  }
);

const nextApi = Axios.create({});

nextApi.interceptors.request.use((config) => {
  return config;
});

nextApi.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (error: AxiosError) => {
    throw error;
  }
);

export { api, nextApi };
