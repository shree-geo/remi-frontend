import InputElement from "@/components/molecules/Form/Input";

export default function EditContactForm() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-normal">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputElement
          label={{
            tKey: "phoneNumberLabel",
            ns: "edit-profile",
          }}
          name="phone_number"
          required
        />

        <InputElement
          label={{
            tKey: "alternatePhoneLabel",
            ns: "edit-profile",
          }}
          name="alternate_phone"
        />
      </div>

      <div className="grid grid-cols-1">
        <InputElement
          label={{
            tKey: "addressLabel",
            ns: "edit-profile",
          }}
          name="address"
          required
        />
      </div>
    </div>
  );
}
