import { hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import STranslation from "@/components/translations/STranslation";

export default async function Page(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  return (
    <div>
      <STranslation tKey="title" slot="h1" />
    </div>
  );
}
