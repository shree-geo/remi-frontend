import { hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import STranslation from "@/components/molecules/translations/STranslation";
import Link from "next/link";

export default async function Page(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  return (
    <div>
      <STranslation tKey="title" slot="h1" />
      <Link href={`/${lang}/dashboard`} className="text-blue-600 underline">
        Dashboard
      </Link>
    </div>
  );
}
