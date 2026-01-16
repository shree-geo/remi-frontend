"use client";

import PasswordInputElement from "@/components/molecules/Form/password";
import { useState } from "react";
import { UserActionState } from "../definitions/type";
import PasswordGenerator from "./passwordGenerator";

interface PasswordInputProps {
  state: UserActionState;
}
const PasswordInput = ({ state }: PasswordInputProps) => {
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="w-full">
        <PasswordInputElement
          label={{
            tKey: "user.form.passwordLabel",
            ns: "settings",
          }}
          error={
            state.error?.password && {
              tKey: "user.form.passwordError",
              ns: "settings",
            }
          }
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full">
        <PasswordInputElement
          label={{
            tKey: "user.form.passwordConfirmLabel",
            ns: "settings",
          }}
          error={
            state.error?.password_confirm && {
              tKey: "user.form.passwordConfirmError",
              ns: "settings",
            }
          }
          name="password_confirm"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-start md:justify-end">
        <PasswordGenerator onGenerate={setPassword} password={password} />
      </div>
    </>
  );
};

export default PasswordInput;
