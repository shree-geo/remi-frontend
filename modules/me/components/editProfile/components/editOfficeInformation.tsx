import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";

const OFFICE_LEVEL_OPTIONS = [
  {
    label: "Province",
    value: "province",
  },
  {
    label: "District",
    value: "district",
  },
  {
    label: "Municipality",
    value: "municipality",
  },

  {
    label: "Ward",
    value: "ward",
  },
];

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
          disabled
        />

        <SelectBox
          label={{
            tKey: "officeLevelLabel",
            ns: "edit-profile",
          }}
          id="office_level"
          options={OFFICE_LEVEL_OPTIONS}
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
