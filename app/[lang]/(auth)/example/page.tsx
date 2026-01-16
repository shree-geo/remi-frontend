import ListUsers from "@/modules/example/components/list";

export default async function Page(props: PageProps<"/[lang]/settings/users">) {
  const searchParams = await props.searchParams;
  return <ListUsers searchParams={searchParams} />;
}
