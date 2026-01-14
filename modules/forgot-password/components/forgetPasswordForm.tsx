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
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="email">
          <CTranslation tKey="emailLabel" ns="forgot-password" />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
        {state.error?.email && (
          <p className="text-red-500">{state.error.email}</p>
        )}
      </div>
      <Button type="submit" className="w-full my-2" disabled={isPending}>
        <CTranslation tKey="submitButton" ns="forgot-password" />
      </Button>
    </form>
  );
}
