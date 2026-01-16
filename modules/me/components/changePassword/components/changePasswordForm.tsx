"use client";

import PasswordInputElement from "@/components/molecules/Form/password";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "@/modules/me/action/changePasswordAction";
import { redirect } from "next/navigation";
import { useActionState } from "react";

export default function ChangePasswordForm() {
  const [state, action, isPending] = useActionState(changePasswordAction, {
    old_password: "",
    password: "",
    password_confirmation: "",
    error: null,
    message: "",
    success: false,
  });

  console.log("error", state.error);

  if (state.success) {
    redirect("/dashboard");
  }
  return (
    <form action={action}>
      <div className="space-y-4">
        <PasswordInputElement
          label={{
            tKey: "currentPasswordLabel",
            ns: "change-password",
          }}
          error={
            state.error?.old_password && {
              tKey: `${state.error?.old_password}`,
              ns: "change-password",
            }
          }
          name="old_password"
          required
        />
        <PasswordInputElement
          label={{
            tKey: "newPasswordLabel",
            ns: "change-password",
          }}
          error={
            state.error?.password && {
              tKey: `${state.error?.password}`,
              ns: "change-password",
            }
          }
          name="password"
          required
        />
        <PasswordInputElement
          label={{
            tKey: "reEnterNewPasswordLabel",
            ns: "change-password",
          }}
          error={
            state.error?.password_confirmation && {
              tKey: `${state.error?.password_confirmation}`,
              ns: "change-password",
            }
          }
          name="password_confirmation"
          required
        />
      </div>
      <Button type="submit" className="w-full my-2" disabled={isPending}>
        <CTranslation tKey="resetButton" ns="change-password" />
      </Button>
    </form>
  );
}
