import Column from "@/components/molecules/table/table.utils";
import List from "@/components/organisms/list";

interface User extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
}

interface ListUsersProps {
  offset?: number;
  limit?: number;
}

const columns: Column<User>[] = [
  new Column("id"),
  new Column("name", {
    header: "Full Name",
    cell: (user) => <strong>{user.name}</strong>,
  }),
  new Column("email"),
  Column.display({
    header: "Actions",
    cell: () => (
      <div>
        <button className="text-blue-600 underline mr-2">Edit</button>
        <button className="text-red-600 underline">Delete</button>
      </div>
    ),
  }),
];

export default async function ListUsers({ offset, limit }: ListUsersProps) {
  const response = await fetch(
    `http://45.117.153.120/api/v1/irc/public?offset=${offset || 0}&limit=${
      limit || 10
    }`
  );
  const json = await response.json();
  const users = json?.data?.results || [];
  return (
    <div>
      <List<User>
        headerProps={{
          title: {
            tKey: "user.list.title",
            ns: "settings",
          },
        }}
        tableProps={{
          columns: columns,
          data: users as User[],
        }}
        paginationProps={{
          total: 50,
          offset: offset,
          limit: limit,
        }}
      />
    </div>
  );
}
