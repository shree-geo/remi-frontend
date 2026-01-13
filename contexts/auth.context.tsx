import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AuthProvider({ children }: PropsWithChildren) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return <>{children}</>;
}
