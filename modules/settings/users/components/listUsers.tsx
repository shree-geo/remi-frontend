import Column from "@/components/molecules/table/table.utils";
import List from "@/components/organisms/list";

interface User extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  new Column("id"),
  new Column("name", {
    header: "Full Name",
  }),
  new Column("email"),
];

export default async function ListUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
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
      />
    </div>
  );
}
