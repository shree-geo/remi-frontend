import InputElement from "@/components/molecules/Form/Input";

export default function EditOfficeInformation() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-normal">Office Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputElement
          label={{
            tKey: "roleLabel",
            ns: "edit-profile",
          }}
          name="role"
          required
        />

        <InputElement
          label={{
            tKey: "officeLevelLabel",
            ns: "edit-profile",
          }}
          name="office_level"
          required
        />
      </div>

      <div className="grid grid-cols-1  gap-4">
        <InputElement
          label={{
            tKey: "provinceLabel",
            ns: "edit-profile",
          }}
          name="province"
          required
        />
      </div>
    </div>
  );
}
