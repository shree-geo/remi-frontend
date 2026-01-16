import InputElement from "@/components/molecules/Form/Input";
import { SelectBox } from "@/components/molecules/Form/select";
import CTranslation from "@/components/molecules/translations/CTranslation";
import { Separator } from "@/components/ui/separator";

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
      <CTranslation
        ns="edit-profile"
        tKey="officeInformation"
        className="text-lg font-medium"
      />
      <Separator className="my-2" />
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
          name="office_level"
          disabled
        />
      </div>
      <div className="grid grid-cols-1  gap-4">
        <InputElement
          label={{
            tKey: "provinceLabel",
            ns: "edit-profile",
          }}
          name="province"
          disabled
        />
      </div>
    </div>
  );
}
