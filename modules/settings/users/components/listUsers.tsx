import Column from "@/components/molecules/table/table.utils";
import List from "@/components/organisms/list";
import { getUsers } from "../data/users";
import { User } from "../definitions/user";

interface ListUsersProps {
  searchParams: Awaited<PageProps<never>["searchParams"]>;
}

const columns: Column<User>[] = [
  new Column("id"),
  new Column("fullname", {
    header: "Full Name",
    cell: (user) => <strong>{user.first_name + " " + user.last_name}</strong>,
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

export default async function ListUsers(props: ListUsersProps) {
  const { searchParams } = props;
  const offset = searchParams?.offset
    ? parseInt(searchParams.offset as string, 10)
    : 0;
  const limit = searchParams?.limit
    ? parseInt(searchParams.limit as string, 10)
    : 10;
  const [response, error] = await getUsers({ query: { offset, limit } });
  if (error) {
    throw new Error(error.message);
  }
  const total = response?.data.data.count || 0;
  const users = response?.data.data.results || [];

  return (
    <div>
      <List<User>
        headerProps={{
          title: {
            tKey: "Example",
          },
        }}
        tableProps={{
          columns: columns,
          data: users as User[],
        }}
        paginationProps={{
          total,
          searchParams: props.searchParams,
        }}
      />
    </div>
  );
}
