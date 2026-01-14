"use client";
import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { userFormAction } from "../action/userFormAction";
import { UserActionState } from "../definitions/type";

export default function UserForm() {
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
            <>User Form</>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
            )}
          >
            <InputElement
              label={{
                tKey: "user.form.fullNameLabel",
                ns: "settings",
              }}
              name="full_name"
              type="text"
              required
            />
            <SelectBox
              label={{
                tKey: "user.form.roleLabel",
                ns: "settings",
              }}
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
            />
            <InputElement
              label={{
                tKey: "user.form.passwordLabel",
                ns: "settings",
              }}
              name="password"
              type="password"
              required
            />
            <Button type="submit" className="w-full" disabled={isPending}>
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
