import { handleApi } from "@/lib/apiHandler";
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
  return await handleApi<User[]>({
    url: `/users/${query ? `?${query}` : ""}`,
    method: "get",
  });
}
