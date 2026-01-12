import STranslation from "@/components/molecules/translations/STranslation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "./dictionaries";

export default async function Page(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <STranslation tKey="title" slot="h1" />
      <div className="flex flex-row gap-4">
        <Link href={`/${lang}/dashboard`} className="text-blue-600 underline">
          Dashboard
        </Link>
        <Link href={`/${lang}/login`} className="text-blue-600 underline">
          Login
        </Link>
      </div>
    </>
  );
}
