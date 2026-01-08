import { fallbackLng } from "@/i18n/settings";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(fallbackLng);
}
