"use client";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { forgotPasswordAction } from "../action/forgetPasswordAction";

export default function ForgetPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {
    email: "",
    error: null,
    message: "",
    success: false,
  });

  const email = state.email;
  console.log(email);
  if (state.success) {
    redirect("/");
  }
  return (
    <form>
      <div className="space-y-2">
        <Label htmlFor="currentPassword">
          <CTranslation tKey="currentPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="old_password"
          name="old_password"
          type="old_password"
          placeholder="Enter current password"
          required
        />
        <Label htmlFor="newPassword">
          <CTranslation tKey="newPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="new_password"
          name="new_password"
          type="new_password"
          placeholder="Enter new password"
          required
        />
        <Label htmlFor="email">
          <CTranslation tKey="reEnterNewPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="renew_password"
          name="renew_password"
          type="renew_password"
          placeholder="Enter New password again"
          required
        />
      </div>
      <Button type="submit" className="w-full my-2" disabled={isPending}>
        <CTranslation tKey="submitButton" ns="forgot-password" />
      </Button>
    </form>
  );
}
