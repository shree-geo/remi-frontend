import Column from "@/components/molecules/table/table.utils";
import Text from "@/components/molecules/text";
import List from "@/components/organisms/list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DeleteIcon, EditIcon } from "lucide-react";
import { getUsers } from "../data/users";
import { User } from "../definitions/user.definitions";

interface ListUsersProps {
  searchParams: Awaited<PageProps<never>["searchParams"]>;
}

const columns: Column<User>[] = [
  Column.display({
    header: "Full Name",
    cell: (user) => (
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            {user.first_name[0] + user.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <Text className="font-bold">
            {user.first_name + " " + user.last_name}
          </Text>
          <Text>{user.role_name}</Text>
        </div>
      </div>
    ),
  }),
  new Column("email"),
  Column.display({
    header: "Actions",
    cell: () => (
      <div>
        <Button size="icon-xs">
          <EditIcon />
        </Button>
        <Button variant="destructive" size="icon-xs">
          <DeleteIcon />
        </Button>
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
    return JSON.stringify(error);
  }
  const total = response?.data.data.count || 0;
  const users = response?.data.data.results || [];

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
          total,
          searchParams: props.searchParams,
        }}
      />
    </div>
  );
}
