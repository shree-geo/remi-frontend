"use client";

import Modal from "@/components/molecules/modal/modal";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { logout } from "./action/logout";

export default function LogoutModal() {
  const router = useRouter();
  // @ts-expect-error ignore
  const action = useActionState(logout, undefined);
  useEffect(() => {
    if (action[0]?.success) {
      router.push("/");
    }
  }, [router, action]);
  return (
    <Modal
      title={<CTranslation tKey="logout.title" />}
      description={<CTranslation tKey="logout.description" />}
      action={action}
      actionButtonText={<CTranslation tKey="logout.actionBtnText" />}
      actionButtonProps={{
        variant: "destructive",
      }}
      triggerComponent={
        <div className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <LogOut className="h-4 w-4" />
          <CTranslation tKey="navbar.logout" />
        </div>
      }
    />
  );
}
