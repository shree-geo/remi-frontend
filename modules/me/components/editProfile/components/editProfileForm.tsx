"use client";
import InputElement from "@/components/molecules/Form/Input";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { editProfileAction } from "@/modules/me/action/editProfileAction";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import EditContactForm from "./editContactForm";
import EditOfficeInformation from "./editOfficeInformation";

export default function EditProfileForm() {
  const [state, action, isPending] = useActionState(editProfileAction, {
    first_name: "",
    last_name: "",
    employee_id: "",
    phone_number: "",
    alternate_phone: "",
    address: "",
    email: "",
    province: "",
    office_level: "",
    error: null,
    message: "",
    success: false,
  });

  console.log("error", state.error);

  if (state.success) {
    redirect("/dashboard");
  }
  return (
    <form action={action}>
      <div className="space-y-4">
        <div className="space-y-3">
          <CTranslation
            ns="edit-profile"
            tKey="basicInformation"
            className="text-lg font-medium"
          />
          <Separator className="my-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputElement
              label={{
                tKey: "firstNameLabel",
                ns: "edit-profile",
              }}
              name="first_name"
              error={
                state.error?.first_name && {
                  tKey: `${state.error?.first_name}`,
                  ns: "edit-profile",
                }
              }
              required
            />

            <InputElement
              label={{
                tKey: "lastNameLabel",
                ns: "edit-profile",
              }}
              name="last_name"
              error={
                state.error?.last_name && {
                  tKey: `${state.error?.last_name}`,
                  ns: "edit-profile",
                }
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputElement
              label={{
                tKey: "employeeIdLabel",
                ns: "edit-profile",
              }}
              name="employee_id"
              error={
                state.error?.employee_id && {
                  tKey: `${state.error?.employee_id}`,
                  ns: "edit-profile",
                }
              }
              required
            />

            <InputElement
              label={{
                tKey: "emailLabel",
                ns: "edit-profile",
              }}
              name="email"
              disabled
            />
          </div>
        </div>

        <EditContactForm state={state} />

        <EditOfficeInformation />

        <Button className="my-3" type="submit" disabled={isPending}>
          {isPending ? (
            <CTranslation ns="common" tKey="button.submitting" />
          ) : (
            <CTranslation ns="common" tKey="button.submit" />
          )}
        </Button>
      </div>
    </form>
  );
}
