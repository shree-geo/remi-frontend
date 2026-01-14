import ListUsers from "@/modules/example/components/listUsers";

export default async function Page(props: PageProps<"/[lang]/settings/users">) {
  const searchParams = await props.searchParams;
  return <ListUsers searchParams={searchParams} />;
}
