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
    <div className="flex flex-col gap-2">
      <div className="w-full">
        <PasswordInputElement
          label={{
            tKey: "user.form.passwordLabel",
            ns: "settings",
          }}
          error={
            state.error?.password && {
              tKey: `${state.error.password}`,
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
      <div className="w-full flex justify-start md:justify-end items-center">
        <PasswordGenerator onGenerate={setPassword} password={password} />
      </div>
    </div>
  );
};

export default PasswordInput;
