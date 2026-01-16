import { handleApi } from "@/lib/apiHandler";
import { api } from "@/lib/axios";
import generateSearchParams from "@/lib/generateSearchParams";
import { User } from "../definitions/user.definitions";

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
      await api.get(`/users/${query ? `?${query}` : ""}`, config),
  );
}
