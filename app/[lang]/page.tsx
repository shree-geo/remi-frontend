import Login from "@/modules/login/components/loginPage";
import { notFound } from "next/navigation";
import { hasLocale } from "./dictionaries";

export default async function Page(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  return <Login />;
}
