"use client";

import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgetPasswordForm() {
  return (
    <form>
      <div className="space-y-2">
        <Label htmlFor="currentPassword">
          <CTranslation tKey="currentPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
        <Label htmlFor="newPassword">
          <CTranslation tKey="newPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
        <Label htmlFor="email">
          <CTranslation tKey="newPasswordLabel" ns="change-password" />
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
      </div>
      <Button type="submit" className="w-full my-2">
        <CTranslation tKey="submitButton" ns="forgot-password" />
      </Button>
    </form>
  );
}
