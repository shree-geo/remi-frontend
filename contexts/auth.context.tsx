import type { PropsWithChildren } from "react";
// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth-client";

export default async function AuthProvider({ children }: PropsWithChildren) {
  // const session = await auth.getSession({});
  // if (!session?.data?.user) redirect("/sign-in");
  return <>{children}</>;
}
