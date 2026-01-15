import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import STranslation from "@/components/molecules/translations/STranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UserFormWrapper from "./formWrapper";
import PasswordInput from "./passwordInput";

export default function UserForm() {
  return (
    <UserFormWrapper>
      <Card>
        <CardHeader>
          <CardTitle>
            <STranslation tKey="user.form.title" ns="settings" />
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
              error={{
                tKey: "user.form.fullNameError",
                ns: "settings",
              }}
            />
            <SelectBox
              name="role"
              label={{
                tKey: "user.form.roleLabel",
                ns: "settings",
              }}
              error={{
                tKey: "user.form.roleError",
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
              error={{
                tKey: "user.form.emailError",
                ns: "settings",
              }}
            />
            <PasswordInput />
          </div>
          <div className={cn("flex justify-start mt-6 ")}>
            <Button type="submit">
              <STranslation tKey={"user.form.submitButton"} ns="settings" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </UserFormWrapper>
  );
}
