"use client";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface PasswordGeneratorProps {
  onGenerate: (password: string) => void;
}

function generatePassword(
  length: number = 14,
  uppercase: boolean = true,
  number: boolean = true,
  symbols: boolean = true
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
}: PasswordGeneratorProps) {
  const handleGenerate = () => {
    const newPassword = generatePassword();
    onGenerate(newPassword);
  };

  return (
    <div className="flex items-end">
      <Button
        type="button"
        variant="outline"
        onClick={handleGenerate}
        className="gap-2"
      >
        <Key size={16} />
        <CTranslation tKey="generatePassword" ns="settings" />
      </Button>
    </div>
  );
}
