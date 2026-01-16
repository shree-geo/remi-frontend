import InputElement from "@/components/molecules/Form/Input";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Separator } from "@/components/ui/separator";
import { ProfileActionState } from "@/modules/me/definitions/type";

interface EditContactFormProps {
  state: ProfileActionState;
}

export default function EditContactForm({ state }: EditContactFormProps) {
  return (
    <div className="space-y-3">
      <CTranslation
        ns="edit-profile"
        tKey="contactInformation"
        className="text-lg font-medium"
      />
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputElement
          label={{
            tKey: "phoneNumberLabel",
            ns: "edit-profile",
          }}
          name="phone_number"
          error={
            state.error?.phone_number && {
              tKey: `${state.error?.phone_number}`,
              ns: "edit-profile",
            }
          }
          type="tel"
          required
        />

        <InputElement
          label={{
            tKey: "alternatePhoneLabel",
            ns: "edit-profile",
          }}
          name="alternate_phone"
          error={
            state.error?.alternate_phone && {
              tKey: `${state.error?.alternate_phone}`,
              ns: "edit-profile",
            }
          }
          type="tel"
        />
      </div>

      <div className="grid grid-cols-1">
        <InputElement
          label={{
            tKey: "addressLabel",
            ns: "edit-profile",
          }}
          name="address"
          type="text"
          required
          error={
            state.error?.address && {
              tKey: `${state.error?.address}`,
              ns: "edit-profile",
            }
          }
        />
      </div>
    </div>
  );
}
