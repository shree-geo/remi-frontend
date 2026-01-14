"use client";
import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useActionState, useState } from "react";
import { userFormAction } from "../action/userFormAction";
import { UserActionState } from "../definitions/type";
import PasswordGenerator from "./passwordGenerator";

export default function UserForm() {
  const [password, setPassword] = useState("");
  const [state, action, isPending] = useActionState(userFormAction, {
    full_name: "",
    role: "user",
    email: "",
    password: "",
    error: null,
    message: "",
    success: false,
  } as UserActionState);

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
                tKey: "user.form.fullNameLabel",
                ns: "settings",
              }}
              name="full_name"
              type="text"
              required
              defaultValue={state.full_name}
              error={
                state.error?.full_name
                  ? {
                      tKey: "user.form.fullNameError",
                      ns: "settings",
                    }
                  : undefined
              }
            />
            <SelectBox
              name="role"
              label={{
                tKey: "user.form.roleLabel",
                ns: "settings",
              }}
              defaultValue={state.role}
              error={
                state.error?.role
                  ? {
                      tKey: "user.form.roleError",
                      ns: "settings",
                    }
                  : undefined
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
              defaultValue={state.email}
              error={
                state.error?.email
                  ? {
                      tKey: "user.form.emailError",
                      ns: "settings",
                    }
                  : undefined
              }
            />
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <InputElement
                  label={{
                    tKey: "user.form.passwordLabel",
                    ns: "settings",
                  }}
                  error={
                    state.error?.password
                      ? {
                          tKey: "user.form.passwordError",
                          ns: "settings",
                        }
                      : undefined
                  }
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-1">
                <PasswordGenerator onGenerate={setPassword} />
              </div>
            </div>
          </div>
          <div className={cn("flex justify-start mt-6 ")}>
            <Button type="submit" disabled={isPending}>
              <CTranslation
                tKey={
                  isPending
                    ? "user.form.submitButtonPending"
                    : "user.form.submitButton"
                }
                ns="settings"
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
