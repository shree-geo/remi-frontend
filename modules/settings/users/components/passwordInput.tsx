"use client";

import PasswordInputElement from "@/components/molecules/Form/password";
import { useState } from "react";
import PasswordGenerator from "./passwordGenerator";

const PasswordInput = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="grid gap-2 sm:grid-cols-1 xl:grid-cols-[2fr_1fr]">
      <div className="w-full">
        <PasswordInputElement
          label={{
            tKey: "user.form.passwordLabel",
            ns: "settings",
          }}
          error={{
            tKey: "user.form.passwordError",
            ns: "settings",
          }}
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-full flex justify-start md:justify-end items-center mb-6">
        <PasswordGenerator onGenerate={setPassword} password={password} />
      </div>
    </div>
  );
};

export default PasswordInput;
