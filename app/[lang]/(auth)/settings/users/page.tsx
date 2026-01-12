import ListUsers from "@/modules/settings/users/components/listUsers";

export default async function Page({
  searchParams,
}: PageProps<"/[lang]/settings/users">) {
  const { offset, limit } = await searchParams;
  return <ListUsers offset={Number(offset || 0)} limit={Number(limit || 10)} />;
}
