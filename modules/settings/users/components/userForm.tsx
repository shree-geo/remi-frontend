"use client";
import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { createUserAction } from "../actions/createUserAction";
import PasswordInput from "./passwordInput";

export default function UserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    employee_id: "",
    role: "user",
    error: null,
    message: "",
    success: false,
  });

  console.log("error", state.error);

  if (state.success) {
    redirect("/settings/users");
  }
  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>
            <CTranslation tKey="user.form.title" ns="settings" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6")}>
            <InputElement
              label={{
                tKey: "user.form.firstNameLabel",
                ns: "settings",
              }}
              name="first_name"
              type="text"
              error={
                state.error?.first_name && {
                  tKey: "user.form.firstNameError",
                  ns: "settings",
                }
              }
              required
            />
            <InputElement
              label={{
                tKey: "user.form.lastNameLabel",
                ns: "settings",
              }}
              name="last_name"
              type="text"
              error={
                state.error?.last_name && {
                  tKey: "user.form.lastNameError",
                  ns: "settings",
                }
              }
              required
            />
            <InputElement
              label={{
                tKey: "user.form.employeeIdLabel",
                ns: "settings",
              }}
              name="employee_id"
              type="text"
              error={
                state.error?.employee_id && {
                  tKey: "user.form.employeeIdError",
                  ns: "settings",
                }
              }
            />
            <SelectBox
              name="role"
              label={{
                tKey: "user.form.roleLabel",
                ns: "settings",
              }}
              error={
                state.error?.role && {
                  tKey: "user.form.roleError",
                  ns: "settings",
                }
              }
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
            <InputElement
              label={{
                tKey: "user.form.emailLabel",
                ns: "settings",
              }}
              name="email"
              type="email"
              required
              error={
                state.error?.email && {
                  tKey: "user.form.emailError",
                  ns: "settings",
                }
              }
            />
            <PasswordInput state={state} />
          </div>
          <div className={cn("flex justify-start mt-6 ")}>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <CTranslation
                  tKey={"user.form.submitButtonPending"}
                  ns="settings"
                />
              ) : (
                <CTranslation tKey={"user.form.submitButton"} ns="settings" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
