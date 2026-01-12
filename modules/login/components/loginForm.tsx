"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { loginAction } from "../action/loginAction";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {
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
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@rmis.gov.np"
          required
        />
        {state.error?.email && (
          <p className="text-red-500">{state.error.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
