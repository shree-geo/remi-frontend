"use client";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { ClipboardCheckIcon, ClipboardIcon, Key } from "lucide-react";
import { useState } from "react";

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
  password?: string;
}

function generatePassword(
  length: number = 14,
  uppercase: boolean = true,
  number: boolean = true,
  symbols: boolean = true,
): string {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  let password = "";

  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (number) charset += "0123456789";
  if (symbols) charset += "~`!@#$%^&*()_-+={[}]|:;<,>.?/";

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}

export default function PasswordGenerator({
  onGenerate,
  password = "",
}: PasswordGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword();
    onGenerate(newPassword);
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <div className="flex items-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleGenerate}
        className="gap-2"
      >
        <Key size={16} />
        <CTranslation tKey={"generatePassword"} ns="settings" />
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleCopy}
        disabled={!password}
        className="gap-2"
      >
        {copied ? (
          <ClipboardCheckIcon size={16} />
        ) : (
          <ClipboardIcon size={16} />
        )}
      </Button>
    </div>
  );
}
