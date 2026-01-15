"use client";

import PasswordInputElement from "@/components/molecules/Form/password";
import { useState } from "react";
import PasswordGenerator from "./passwordGenerator";

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
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
      <div className="mt-1">
        <PasswordGenerator onGenerate={setPassword} />
      </div>
    </div>
  );
};

export default PasswordInput;
