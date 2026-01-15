import { handleApi } from "@/lib/apiHandler";
import { api } from "@/lib/axios";
import generateSearchParams from "@/lib/generateSearchParams";
import { User } from "../definitions/user";

interface GetUsers {
  query: {
    offset: number;
    limit: number;
  };
}

export async function getUsers(options: GetUsers) {
  const [query] = generateSearchParams(options.query);
  return await handleApi<User[]>(
    async ({ config }) =>
      await api.get(`/profiles/${query ? `?${query}` : ""}`, config)
  );
}
