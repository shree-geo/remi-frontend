"use client";
import FormToast from "@/components/molecules/Form/FormToast";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { loginAction } from "../action/loginAction";
import ForgetPasswordBtn from "./forgetPasswordBtn";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, {
    email: "",
    password: "",
    error: null,
    message: "",
    success: false,
  });

  if (state.success) {
    redirect("/dashboard");
  }

  return (
    <form className="space-y-4" action={action}>
      <div className="space-y-2">
        <Label htmlFor="email">
          <CTranslation tKey="emailLabel" ns="login" />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
          defaultValue={state.email}
        />
        {state.error?.email && (
          <p className="text-red-500">
            <CTranslation tKey={state.error.email as string} ns="login" />
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          <CTranslation tKey="passwordLabel" ns="login" />
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          defaultValue={state.password}
          required
        />
        {state.error?.password && (
          <p className="text-red-500">
            <CTranslation tKey={state.error.password as string} ns="login" />
          </p>
        )}
      </div>
      <ForgetPasswordBtn />
      <Button type="submit" className="w-full" disabled={isPending}>
        <CTranslation
          tKey={isPending ? "signingInButton" : "signInButton"}
          ns="login"
        />
      </Button>
      <FormToast error={state.error} message={state.message} />
    </form>
  );
}
