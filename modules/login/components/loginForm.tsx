"use client";
import FormToast from "@/components/molecules/Form/FormToast";
import InputElement from "@/components/molecules/Form/Input";
import PasswordInputElement from "@/components/molecules/Form/password";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
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
      <InputElement
        label={{ tKey: "emailLabel", ns: "login" }}
        error={state.error?.email}
        defaultValue={state.email}
        id="email"
        name="email"
        type="email"
        required
      />

      <PasswordInputElement
        label={{ tKey: "passwordLabel", ns: "login" }}
        error={state.error?.password}
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        defaultValue={state.password}
        required
      />

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
